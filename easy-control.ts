//% color="#4169E1" icon="\uf22b"
//% groups="['Control']"
//% block="Easy control"
namespace Control {

    //% block="Crear nuevo controlador proporcional con ganancia kp=$kp"
    //% kp.defl = 1
    //% group="Control"
    //% blockSetVariable=PropControl
    export function newPropControl(kp: number): PropControl {
        return new PropControl(kp)
    }

    //% block="Crear nuevo controlador PI con ganancias kp=$kp ki=$ki"
    //% kp.defl = 1
    //% ki.defl = 0.1
    //% group="Control"
    //% blockSetVariable=PIControl
    export function newPIControl(kp: number, ki: number): PIControl {
        return new PIControl(kp, ki)
    }

    //% block="Crear nuevo controlador PID con ganancias kp=$kp ki=$ki kd=$kd"
    //% kp.defl = 1
    //% ki.defl = 0.1
    //% kd.defl = 0.05
    //% group="Control"
    //% blockSetVariable=PIDControl
    export function newPIDControl(kp: number, ki: number, kd: number): PIDControl {
        return new PIDControl(kp, ki, kd)
    }
}

//% blockNamespace=Control   
//% autoCreate=Control.newPropControl
class PropControl {
    //% group="Control"
    private kp: number;
    private _correction: number;

    constructor(kp: number) {
        this.kp = kp
        this._correction = 0
    }

    /**
    * Calcula la corrección proporcional basada en el error entre el valor medido y el objetivo
    */
    //% this.defl=PropControl
    //% block="Corrección: $this para valor medido= $measured y objetivo= $target" 
    GetCorrection(measured: number, target: number) {
        let error = target - measured;  // El error es la diferencia entre el objetivo y el valor medido
        this._correction = this.kp * error;  // La corrección es proporcional al error
        return this._correction;
    }
}

//% blockNamespace=Control   
//% autoCreate=Control.newPIControl
class PIControl {
    //% group="Control"
    private kp: number;
    private ki: number;
    private _correction: number;
    private _integral: number;
    private _lastTime: number;
    private _firstRun: boolean;

    constructor(kp: number, ki: number) {
        this.kp = kp
        this.ki = ki
        this._correction = 0
        this._integral = 0
        this._lastTime = 0
        this._firstRun = true
    }

    /**
    * Calcula la corrección PI basada en el error entre el valor medido y el objetivo
    */
    //% this.defl=PIControl
    //% block="Corrección: $this para valor medido= $measured y objetivo= $target" 
    GetCorrection(measured: number, target: number) {
        let currentTime = control.millis();
        let deltaTime = 0;
        
        // Si es la primera ejecución, inicializar el tiempo
        if (this._firstRun) {
            this._firstRun = false;
            this._lastTime = currentTime;
            deltaTime = 0; // No hay término integral en la primera ejecución
        } else {
            deltaTime = (currentTime - this._lastTime) / 1000.0; // Convertir a segundos
            this._lastTime = currentTime;
        }
        
        let error = target - measured;
        
        // Calcular el término integral
        if (deltaTime > 0) {
            this._integral += error * deltaTime;
        }
        
        // Calcular la corrección combinando los términos proporcional e integral
        let pTerm = this.kp * error;
        let iTerm = this.ki * this._integral;
        
        this._correction = pTerm + iTerm;
        return this._correction;
    }

    /**
    * Reinicia el acumulador integral
    */
    //% this.defl=PIControl
    //% block="Reiniciar $this" 
    Reset() {
        this._integral = 0;
        this._firstRun = true;
    }
}

//% blockNamespace=Control   
//% autoCreate=Control.newPIDControl
class PIDControl {
    //% group="Control"
    private kp: number;
    private ki: number;
    private kd: number;
    private _correction: number;
    private _integral: number;
    private _previousError: number;
    private _lastTime: number;
    private _firstRun: boolean;
    private _outputMin: number;
    private _outputMax: number;

    constructor(kp: number, ki: number, kd: number) {
        this.kp = kp
        this.ki = ki
        this.kd = kd
        this._correction = 0
        this._integral = 0
        this._previousError = 0
        this._lastTime = 0
        this._firstRun = true
        this._outputMin = -Infinity
        this._outputMax = Infinity
    }

    /**
    * Establece límites para la salida del controlador
    */
    //% this.defl=PIDControl
    //% block="Establecer límites para $this mínimo=$min máximo=$max" 
    SetLimits(min: number, max: number) {
        this._outputMin = min;
        this._outputMax = max;
    }

    /**
    * Calcula la corrección PID basada en el error entre el valor medido y el objetivo
    */
    //% this.defl=PIDControl
    //% block="Corrección: $this para valor medido= $measured y objetivo= $target" 
    GetCorrection(measured: number, target: number) {
        let currentTime = control.millis();
        let deltaTime = 0;
        let derivative = 0;
        
        let error = target - measured;
        
        // Si es la primera ejecución, inicializar variables
        if (this._firstRun) {
            this._firstRun = false;
            this._lastTime = currentTime;
            this._previousError = error;
            return this.kp * error; // Solo usar el término proporcional en la primera ejecución
        }
        
        // Calcular el tiempo transcurrido
        deltaTime = (currentTime - this._lastTime) / 1000.0; // Convertir a segundos
        this._lastTime = currentTime;
        
        if (deltaTime <= 0) {
            return this._correction; // Evitar división por cero
        }
        
        // Calcular el término integral
        this._integral += error * deltaTime;
        
        // Calcular el término derivativo
        derivative = (error - this._previousError) / deltaTime;
        this._previousError = error;
        
        // Calcular la corrección combinando los tres términos
        let pTerm = this.kp * error;
        let iTerm = this.ki * this._integral;
        let dTerm = this.kd * derivative;
        
        this._correction = pTerm + iTerm + dTerm;
        
        // Aplicar límites si están definidos
        if (this._correction > this._outputMax) {
            this._correction = this._outputMax;
        } else if (this._correction < this._outputMin) {
            this._correction = this._outputMin;
        }
        
        return this._correction;
    }

    /**
    * Reinicia el controlador PID
    */
    //% this.defl=PIDControl
    //% block="Reiniciar $this" 
    Reset() {
        this._integral = 0;
        this._previousError = 0;
        this._firstRun = true;
    }
}
