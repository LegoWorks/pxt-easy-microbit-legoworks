Easy_pins.setPin(DigitalPin.P0, true)
basic.forever(function () {
    if (Easy_pins.OnPinState(DigitalPin.P0, true)) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.Tortoise)
    }
})
