/*jslint node: true */
"use strict";

/**
 * @package   nodecopting
 * @file      nodecopting.js
 * @summary   Javascript application making use of the Node.js 
 *            framework "NodeCopter" to control 
 *            the drone helicopter "Parrot AR.Drone 2.0"
 * @author    Rolf Hemmerling <hemmerling@gmx.net>
 * @version   1.00,
 *            programming language "Javascript",
 *            framework "NodeCopter" 
 *            ( http://www.github.com/nodecopter )
 * @date      2015-08-16
 * @copyright MIT License
 *
 * nodecopting.js - Javascript application making use of the Node.js 
 *                  framework "NodeCopter" 
 *                  ( http://www.github.com/nodecopter ), 
 *                  to control the drone helicopter 
 *                  "Parrot AR.Drone 2.0" 
 *
 * Copyright (c) 2015 Rolf Hemmerling
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * You may obtain a copy of the License at
 * http://www.opensource.org/licenses/MIT
 *
 */

var arDrone = require('ar-drone');
var client  = arDrone.createClient();

/**  
 *   @fn       flight01
 *   @summary  Flight script #1, 
 *             NodeCopter doesn' takeoff
 */
var myflight01_nostart = function flight01() {
    client.takeoff();
    client
            .after(5000, function () {
            this.clockwise(0.5);
        })
            .after(3000, function () {
            this.stop();
            this.land();
        });
    /* End of execution */
    process.exit();
};

/* +++++++++++++++++++++++++++++++++++++++++ */

/**  
 *   @fn       flight02
 *   @summary  Flight script #2, 
 *             NodeCopter doesn't land
 */
var myflight02_no_landing = function flight02() {
    client.takeoff();
    client
        .after(5000, function () {
            this.clockwise(0.5);
        })
        .after(3000, function () {
            this.stop();
            this.land();
            /* End of execution */
            process.exit();
        });
};

/* +++++++++++++++++++++++++++++++++++++++++ */

/**  
 *   @fn       flight03
 *   @summary  Flight script #3, 
 *             NodeCopter both properly lands and 
 *             properly ends the script execution
 */
var myflight03_proper_landing = function flight03() {
    /* NodeCopter both properly lands and 
    properly ends the script execution */
    client.takeoff(function () {
        setTimeout(function () {
            client.land(function () {
                console.log("End of Flight");
                process.exit();
            });
        }, 3000);
    });
};

/* +++++++++++++++++++++++++++++++++++++++++ */

/**  
 *   @fn       takeoff04
 *   @param    callback
 *   @param    duration
 *   @summary  Takeoff flight action
 */
function takeoff04(callback, duration) {
    client.takeoff(function () {
        callback(duration);
    });
}

/**  
 *   @fn       shutDown04
 *   @summary  Shut down the application,
 *             i.e. let the script end, so that
 *             the control returns to the calling
 *             application, e.g. the shell 
 *             ( e.g. COMMAND.COM )
 */
function shutDown04() {
    console.log("End of Flight");
    process.exit();
}

/**  
 *   @fn       land04
 *   @param    callback
 *   @summary  Let the drone land ( = takedown )
 */
function land04(callback) {
    client.stop();
    client.land(function () {
        callback();
    });
}

/**  
 *   @fn       setRemainingFlightDuration04b
 *   @param    duration
 *   @summary  Set remaining time for the 
 *             lasting flight duration
 */
function setRemainingFlightDuration04b(duration) {
    setTimeout(function () {
        client.land(function () {
            shutDown04();
        });
    }, duration);
}

/**  
 *   @fn       setRemainingFlightDuration04c
 *   @param    duration
 *   @summary  Set remaining time for the 
 *             lasting flight duration
 */
function setRemainingFlightDuration04c(duration) {
    setTimeout(function () {
        client.land(function () {
            shutDown04();
        });
    }, duration);
}

/**  
 *   @fn       setRemainingFlightDuration04d
 *   @param    duration
 *   @summary  Set remaining time for the 
 *             lasting flight duration
 */
function setRemainingFlightDuration04d(duration) {
    setTimeout(function () {
        client.land(function () {
            shutDown04();
        });
    }, duration);
}

/**  
 *   @fn       setRemainingFlightDuration04e
 *   @param    duration
 *   @summary  Set remaining time for the 
 *             lasting flight duration
 */
function setRemainingFlightDuration04e(duration) {
    setTimeout(function () {
        land04(this.callbackLand04);
    }, duration);
}

/**  
 *   @fn       displaySensorData
 *   @summary  Output of the sensor data on the console
 */
function displaySensorData() {
    client.on('navdata', console.log);
}

/**  
 *   @class    NodeCopter04
 *   @summary  Main class to handle the drone, 
 *             NodeCopter both properly lands and 
 *             properly ends the script execution
 */
function NodeCopter04(pilot) {

    /* Class variables */
    this.pilot = pilot;
    this.action01Duration = 2000;
    
    this.callbackTakeoff04c = function (duration) {
        setRemainingFlightDuration04c(duration);
    };
    this.callbackTakeoff04d = function (duration) {
        setRemainingFlightDuration04d(duration);
    };
    this.callbackLand04 = function () {
        shutDown04();
    };
    
    /**  
     *   @fn       flight04a
     *   @param    duration
     *   @summary  Flight action
     */
    function Flight04a(duration) {
        client.takeoff(function () {
            setTimeout(function () {
                client.land(function () {
                    shutDown04();
                });
            }, duration);
        });
    }

    /**  
     *   @fn       flight04b
     *   @param    duration
     *   @summary  Flight action
     */
    function Flight04b(duration) {
        client.takeoff(function () {
            setRemainingFlightDuration04b(duration);
        });
    }

    /**  
     *   @fn       flight04c
     *   @param    duration
     *   @summary  Flight action
     */
    function Flight04c(duration) {
        /* JSLint: "Strict Violation", 
           if the function "FLigth04c" has no leading capital letter */
        takeoff04(this.callbackTakeoff04c, duration);
    }
    
    /**  
     *   @fn       flight04d
     *   @param    duration
     *   @summary  Flight action
     */
    function Flight04d(duration) {
        /* JSLint: "Strict Violation", 
           if the function "FLigth04c" has no leading capital letter */
        takeoff04(this.callbackTakeoff04d, duration);
    }

    /**  
     *   @fn       flight04e
     *   @param    duration
     *   @summary  Flight action
     */
    function Flight04e(duration) {
        client.takeoff();
        client.after(duration * 2, function () {
            land04(shutDown04);
        });
    }

    /* Class variables */
    this.action01 = Flight04e;

}

/**  
 *   @fn       flight04_function
 *   @param    verbose
 *   @summary  Flight script #4, 
 *             NodeCopter both properly lands and 
 *             properly ends the script execution
 */
var myflight04 = function flight04_function(verbose) {
    var action01Duration = 3000,
        nodeCopter04 = new NodeCopter04('Rolf');
    nodeCopter04.passengers = "OpenTechSchool class";
    if (verbose) {
        console.log("Verbose");
        displaySensorData();
    }
    //nodeCopter04.action01(nodeCopter04.action01Duration);
    nodeCopter04.action01(action01Duration);
};

/* +++++++++++++++++++++++++++++++++++++++++ */

/**  
 *   @summary  These commands are processed 
 *             when the script is executed
 */
console.log("Flight");
//myflight01_nostart();
//myflight02_no_landing();
//myflight03_proper_landing();
myflight04();
