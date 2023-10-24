
//% color="#4169E1" icon="\uf11b"
//% groups="['Digital pins', 'Analog pins']"
//% block="Easy pins"

namespace Easy_pins {



    /**
     * Block to control digital pins.
     */
    //% block="Fijar $pin a $value"
    //% group="Digital pins"

    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=20
    //% pin.fieldOptions.columns=1

    //% value.shadow="toggleOnOff"


    export function setPin(pin: DigitalPin, value: boolean) {
        value ? pins.digitalWritePin(pin, 1) : pins.digitalWritePin(pin, 0);
    }

    /**
     * Block to read digital pins value.
     */
    //% block="Leer valor digital de $pin"
    //% group="Digital pins"

    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=20
    //% pin.fieldOptions.columns=1
    export function readPin(pin: DigitalPin): int8 {
        return pins.digitalReadPin(pin)
    }


    /**
     * Block to read analog pins value.
     */
    //% block="Leer valor analógico de $pin"
    //% group="Analog pins"

    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=20
    //% pin.fieldOptions.columns=1
    export function readAnalogPin(pin: AnalogPin) {
        return pins.analogReadPin(pin)
    }

    /**
     * Block to control analog pins.
     */
    //% block="Fijar $pin analógico a $value"
    //% group="Analog pins"

    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=20
    //% pin.fieldOptions.columns=1

    //% value.min=0 value.max=1023 value.defl=1 
    export function writeAnalog(pin: AnalogPin, value: number) {
        pins.analogWritePin(pin, value)
    }

}



//% color="#4169E1" icon="\uf22b"
//% groups="['PID']"
//% block="Easy control"
namespace Control{
    
    //% block="Crear nuevo controlador con parametros: kp=$kp | ti=$ti |td=$td"
     //% kp.defl = 1 
    //% ti.defl = 1
    //% td.defl = 0
    //% group="PID"
   
    export function NewPID(kp:number, ti:number, td:number): PID { 
        
        let PID1 = new PID(kp, ti, td)
        return PID1
    }
}

//% blockNamespace=Control   
//% blockId="PID_controller"
//% autoCreate=Control.NewPID
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

    //% block="Corrección: $this para una entrada= $input y con objetivo= $target" 
    GetCorrection(input: number, target: number) {

        this._error = input - target;
        this._error_dif = this._error - this._last_error;
        this._error_sum += this._error;

        this._correction = this.kp * this._error + (this.kp / this.ti) * this._error_sum + this.kp * this.td * this._error_dif
        return this._correction
    }


}
