

//% color="#4169E1" icon="\uf22b"
//% groups="['PID']"
//% block="Easy control"
namespace Control{
    
    //% block="Crear nuevo controlador con parametros: kp=$kp ti=$ti td=$td"
    //% kp.defl = 1 ti.defl = 1 td.defl = 0
    //% group="PID"
    //% blockSetVariable=PID
    export function newPID(kp:number, ti:number, td:number): PID { 
         
        return new PID(kp, ti, td)
    }
}

//% blockNamespace=Control   
//% autoCreate=Control.newPID
class PID {
    //% group="PID"
    private kp:number;
    private ti:number;
    private td:number;
    private _error:number;
    private _error_dif:number;
    private _error_sum:number;
    private _last_error:number;
    private _correction:number;

    constructor(kp:number, ti:number, td:number){
        this.kp = kp
        this.ti = ti
        this.td = td

        // not exposed
        this._correction = 0
        this._error = 0
        this._error_dif = 0
        this._error_sum = 0
        this._last_error = 0
  
    }


    // exposed as read-only (only in the getter block)
    /**
    * Block to control analog pins.
    */

    //% this.defl=PID
    //% block="Corrección: $this para una entrada= $input y con objetivo= $target" 
    GetCorrection(input: number, target: number) {

        this._error = input - target;
        this._error_dif = this._error - this._last_error;
        this._error_sum += this._error;

        this._correction = this.kp * this._error + (this.kp / this.ti) * this._error_sum + this.kp * this.td * this._error_dif
        return this._correction
    }


}
