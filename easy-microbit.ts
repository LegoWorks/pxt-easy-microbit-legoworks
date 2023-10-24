
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
     * When digital pin is low or high, code below will be execute.
     */
    //% block="Pin $pin está $value"

    //% value.shadow="toggleOnOff"
    export function OnPinState(pin:DigitalPin, value:boolean):boolean{
        return value ? 
        (pins.digitalReadPin(pin) == 1 ? true : false) : 
        (pins.digitalReadPin(pin) == 0 ? true : false)
        
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

    //% value.min=0 value.max=1023 value.defl=0
    export function writeAnalog(pin: AnalogPin, value: number) {
        pins.analogWritePin(pin, value)
    }

}


