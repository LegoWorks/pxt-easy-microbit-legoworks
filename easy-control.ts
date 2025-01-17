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