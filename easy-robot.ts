
//% color="#4169E1" icon="\uf11b"
//% groups="['Config', 'movement']"
//% block="Easy robot"



namespace Easy_robot {

    /**
     * Block to control digital pins.
     */
    //% block="Fijar $pin a $value"
    //% group="Digital pins"

    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.width=20
    //% pin.fieldOptions.columns=1

    //% value.shadow="toggleOnOff"


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

}


