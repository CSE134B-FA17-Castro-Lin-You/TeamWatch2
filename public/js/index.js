/*
 *  Vanilla Javascript timepicker that allows setting of minTime and maxTime
 *
 *        View below code for a list of available methods
 *
 *  Developer: Lance Jernigan
 *  Version: 1.0.4
 *
 */


/*
 *  Setup our arguments to pass to our timepicker
 *
 *  @args - format (boolean) - Whether to format the input value or leave in 24 hour
 *          minTime (string) - Minimum time the timepicker should reach (any valid time string Javascript's Date() will accept)
 *          maxTime (string) - Maximum time the timepicker should reach (any valid time string Javascript's Date() will accept)
 *          meridiem (boolean) - Whether the timepicker should display the meridiem (defaults to true if format is true and false if format is false)
 *          arrowColor (string) - Any valid color (Hex, RGB, RGBA, etc.) to use for the arrows
 *
 */

var args = {
    // format: true,
    // minTime: '2:00 am',
    // maxTime: '1:00 pm',
    // meridiem: false
}

/*
 *  Create a new timepicker for our input and pass it our args
 */



/*
 *  Timepicker Methods
 *
 *  updateSettings()
 *
 *     Update the settings originally passed to your timepicker
 *
 *     @parameters - args (a list of available arguments is provided above the code)
 *
 *
 *  updateTime()
 *
 *     Update the time based on parameters passed
 *
 *     @parameters - method (string) - What method to affect ('hour', 'minute', 'meridiem')
 *                   add (boolean) - True to add amount, false to subtract amount
 *                   amount /optional/ (number) - Number to add or subtract from method (defaults to 1)
 *
 *
 *  add()
 *
 *     Add amount to selected method
 *
 *     @parameters - method (string) - What method to affect ('hour', 'minute')
 *                   amount /optional/ (number) - Number to add to method (defaults to 1)
 *
 *
 *  subtract()
 *
 *     subtract amount from selected method
 *
 *     @parameters - method (string) - What method to affect ('hour', 'minute')
 *                   amount /optional/ (number) - Number to subtract from method (defaults to 1)
 *
 *
 *  buildString()
 *
 *     Returns the string that will be sent to the input
 *
 *
 *  getTime()
 *
 *     Returns the date object for the current selected time
 *
 *
 *  getHour()
 *
 *     Returns the current hour for the timepicker
 *
 *
 *  getMinute()
 *
 *     Returns the current Minute for the timepicker
 *
 *
 *  getMeridiem()
 *
 *     Returns the current Meridiem for the timepicker
 *
 *
 *  get
 */
tpicker.updateSettings({minTime: '2:00 am'})