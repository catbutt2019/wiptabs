(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/chunk-6c3d2f60.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/chunk-6c3d2f60.js ***!
  \********************************************************************/
/*! exports provided: a, b, c, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelectionEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hapticSelection; });
/**
 * Check to see if the Haptic Plugin is available
 * @return Returns `true` or false if the plugin is available
 */
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
function hapticSelection() {
    var engine = window.TapticEngine;
    if (engine) {
        engine.selection();
    }
}
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
function hapticSelectionStart() {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionStart();
    }
}
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
function hapticSelectionChanged() {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionChanged();
    }
}
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
function hapticSelectionEnd() {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionEnd();
    }
}



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js ***!
  \********************************************************************/
/*! exports provided: c, g, h, o */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openURL; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

function hostContext(selector, el) {
    return el.closest(selector) !== null;
}
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
function createColorClasses(color) {
    var _a;
    return (typeof color === 'string' && color.length > 0) ? (_a = {
            'ion-color': true
        },
        _a["ion-color-" + color] = true,
        _a) : undefined;
}
function getClassList(classes) {
    if (classes !== undefined) {
        var array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(function (c) { return c != null; })
            .map(function (c) { return c.trim(); })
            .filter(function (c) { return c !== ''; });
    }
    return [];
}
function getClassMap(classes) {
    var map = {};
    getClassList(classes).forEach(function (c) { return map[c] = true; });
    return map;
}
var SCHEME = /^[a-z][a-z0-9+\-.]*:/;
function openURL(url, ev, direction) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var router;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(url != null && url[0] !== '#' && !SCHEME.test(url))) return [3 /*break*/, 2];
                    router = document.querySelector('ion-router');
                    if (!router) return [3 /*break*/, 2];
                    if (ev != null) {
                        ev.preventDefault();
                    }
                    return [4 /*yield*/, router.componentOnReady()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, router.push(url, direction)];
                case 2: return [2 /*return*/, false];
            }
        });
    });
}



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/legacy/chunk-cae2ca23.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/chunk-cae2ca23.js ***!
  \********************************************************************/
/*! exports provided: s */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return sanitizeDOMString; });
/**
 * Does a simple sanitization of all elements
 * in an untrusted string
 */
var sanitizeDOMString = function (untrustedString) {
    try {
        if (typeof untrustedString !== 'string' || untrustedString === '') {
            return untrustedString;
        }
        /**
         * Create a document fragment
         * separate from the main DOM,
         * create a div to do our work in
         */
        var documentFragment_1 = document.createDocumentFragment();
        var workingDiv = document.createElement('div');
        documentFragment_1.appendChild(workingDiv);
        workingDiv.innerHTML = untrustedString;
        /**
         * Remove any elements
         * that are blocked
         */
        blockedTags.forEach(function (blockedTag) {
            var getElementsToRemove = documentFragment_1.querySelectorAll(blockedTag);
            for (var elementIndex = getElementsToRemove.length - 1; elementIndex >= 0; elementIndex--) {
                var element = getElementsToRemove[elementIndex];
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                else {
                    documentFragment_1.removeChild(element);
                }
                /**
                 * We still need to sanitize
                 * the children of this element
                 * as they are left behind
                 */
                var childElements = getElementChildren(element);
                /* tslint:disable-next-line */
                for (var childIndex = 0; childIndex < childElements.length; childIndex++) {
                    sanitizeElement(childElements[childIndex]);
                }
            }
        });
        /**
         * Go through remaining elements and remove
         * non-allowed attribs
         */
        // IE does not support .children on document fragments, only .childNodes
        var documentFragmentChildren = getElementChildren(documentFragment_1);
        /* tslint:disable-next-line */
        for (var childIndex = 0; childIndex < documentFragmentChildren.length; childIndex++) {
            sanitizeElement(documentFragmentChildren[childIndex]);
        }
        // Append document fragment to div
        var fragmentDiv = document.createElement('div');
        fragmentDiv.appendChild(documentFragment_1);
        // First child is always the div we did our work in
        var getInnerDiv = fragmentDiv.querySelector('div');
        return (getInnerDiv !== null) ? getInnerDiv.innerHTML : fragmentDiv.innerHTML;
    }
    catch (err) {
        console.error(err);
        return '';
    }
};
/**
 * Clean up current element based on allowed attributes
 * and then recursively dig down into any child elements to
 * clean those up as well
 */
var sanitizeElement = function (element) {
    // IE uses childNodes, so ignore nodes that are not elements
    if (element.nodeType && element.nodeType !== 1) {
        return;
    }
    for (var i = element.attributes.length - 1; i >= 0; i--) {
        var attribute = element.attributes[i];
        var attributeName = attribute.name;
        // remove non-allowed attribs
        if (!allowedAttributes.includes(attributeName.toLowerCase())) {
            element.removeAttribute(attributeName);
            continue;
        }
        // clean up any allowed attribs
        // that attempt to do any JS funny-business
        var attributeValue = attribute.value;
        /* tslint:disable-next-line */
        if (attributeValue != null && attributeValue.toLowerCase().includes('javascript:')) {
            element.removeAttribute(attributeName);
        }
    }
    /**
     * Sanitize any nested children
     */
    var childElements = getElementChildren(element);
    /* tslint:disable-next-line */
    for (var i = 0; i < childElements.length; i++) {
        sanitizeElement(childElements[i]);
    }
};
/**
 * IE doesn't always support .children
 * so we revert to .childNodes instead
 */
var getElementChildren = function (element) {
    return (element.children != null) ? element.children : element.childNodes;
};
var allowedAttributes = ['class', 'id', 'href', 'src', 'name', 'slot'];
var blockedTags = ['script', 'style', 'iframe', 'meta', 'link', 'object', 'embed'];



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js ***!
  \********************************************************************/
/*! exports provided: a, b, c, d, e, f, h, i, n, p, r */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return assert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return debounceEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return findItemLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hasShadowDom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isEndSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return pointerCoord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return renderHiddenInput; });
function rIC(callback) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback);
    }
    else {
        setTimeout(callback, 32);
    }
}
function hasShadowDom(el) {
    return !!el.shadowRoot && !!el.attachShadow;
}
function findItemLabel(componentEl) {
    var itemEl = componentEl.closest('ion-item');
    if (itemEl) {
        return itemEl.querySelector('ion-label');
    }
    return null;
}
function renderHiddenInput(always, container, name, value, disabled) {
    if (always || hasShadowDom(container)) {
        var input = container.querySelector('input.aux-input');
        if (!input) {
            input = container.ownerDocument.createElement('input');
            input.type = 'hidden';
            input.classList.add('aux-input');
            container.appendChild(input);
        }
        input.disabled = disabled;
        input.name = name;
        input.value = value || '';
    }
}
function clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
}
function assert(actual, reason) {
    if (!actual) {
        var message = 'ASSERT: ' + reason;
        console.error(message);
        debugger; // tslint:disable-line
        throw new Error(message);
    }
}
function now(ev) {
    return ev.timeStamp || Date.now();
}
function pointerCoord(ev) {
    // get X coordinates for either a mouse click
    // or a touch depending on the given event
    if (ev) {
        var changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
            var touch = changedTouches[0];
            return { x: touch.clientX, y: touch.clientY };
        }
        if (ev.pageX !== undefined) {
            return { x: ev.pageX, y: ev.pageY };
        }
    }
    return { x: 0, y: 0 };
}
/**
 * @hidden
 * Given a side, return if it should be on the end
 * based on the value of dir
 * @param side the side
 * @param isRTL whether the application dir is rtl
 */
function isEndSide(side) {
    var isRTL = document.dir === 'rtl';
    switch (side) {
        case 'start': return isRTL;
        case 'end': return !isRTL;
        default:
            throw new Error("\"" + side + "\" is not a valid value for [side]. Use \"start\" or \"end\" instead.");
    }
}
function debounceEvent(event, wait) {
    var original = event._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
    };
}
function debounce(func, wait) {
    if (wait === void 0) { wait = 0; }
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timer);
        timer = setTimeout.apply(void 0, [func, wait].concat(args));
    };
}



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _firebase_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./firebase.service */ "./src/app/services/firebase.service.ts");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");





var AuthService = /** @class */ (function () {
    function AuthService(firebaseService, afAuth) {
        this.firebaseService = firebaseService;
        this.afAuth = afAuth;
    }
    AuthService.prototype.doRegister = function (value) {
        return new Promise(function (resolve, reject) {
            firebase_app__WEBPACK_IMPORTED_MODULE_2__["auth"]().createUserWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthService.prototype.doLogin = function (value) {
        return new Promise(function (resolve, reject) {
            firebase_app__WEBPACK_IMPORTED_MODULE_2__["auth"]().signInWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthService.prototype.doLogout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afAuth.auth.signOut()
                .then(function () {
                _this.firebaseService.unsubscribeOnLogOut();
                resolve();
            }).catch(function (error) {
                console.log(error);
                reject();
            });
        });
    };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firebase_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"],
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__["AngularFireAuth"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/firebase.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/firebase.service.ts ***!
  \**********************************************/
/*! exports provided: FirebaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirebaseService", function() { return FirebaseService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/storage */ "./node_modules/firebase/storage/dist/index.esm.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");






var FirebaseService = /** @class */ (function () {
    function FirebaseService(afs, afAuth) {
        this.afs = afs;
        this.afAuth = afAuth;
    }
    FirebaseService.prototype.getTasks = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afAuth.user.subscribe(function (currentUser) {
                if (currentUser) {
                    _this.snapshotChangesSubscription = _this.afs.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges();
                    resolve(_this.snapshotChangesSubscription);
                }
            });
        });
    };
    FirebaseService.prototype.getTask = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afAuth.user.subscribe(function (currentUser) {
                if (currentUser) {
                    _this.snapshotChangesSubscription = _this.afs.doc('people/' + currentUser.uid + '/tasks/' + taskId).valueChanges()
                        .subscribe(function (snapshots) {
                        resolve(snapshots);
                    }, function (err) {
                        reject(err);
                    });
                }
            });
        });
    };
    FirebaseService.prototype.unsubscribeOnLogOut = function () {
        //remember to unsubscribe from the snapshotChanges
        this.snapshotChangesSubscription.unsubscribe();
    };
    FirebaseService.prototype.updateTask = function (taskKey, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase_app__WEBPACK_IMPORTED_MODULE_3__["auth"]().currentUser;
            _this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.deleteTask = function (taskKey) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase_app__WEBPACK_IMPORTED_MODULE_3__["auth"]().currentUser;
            _this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.createTask = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase_app__WEBPACK_IMPORTED_MODULE_3__["auth"]().currentUser;
            _this.afs.collection('people').doc(currentUser.uid).collection('tasks').add({
                title: value.title,
                description: value.description,
                image: value.image
            })
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.encodeImageUri = function (imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
            var aux = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            var dataURL = c.toDataURL("image/jpeg");
            callback(dataURL);
        };
        img.src = imageUri;
    };
    ;
    FirebaseService.prototype.uploadImage = function (imageURI, randomId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var storageRef = firebase_app__WEBPACK_IMPORTED_MODULE_3__["storage"]().ref();
            var imageRef = storageRef.child('image').child(randomId);
            _this.encodeImageUri(imageURI, function (image64) {
                imageRef.putString(image64, 'data_url')
                    .then(function (snapshot) {
                    snapshot.ref.getDownloadURL()
                        .then(function (res) { return resolve(res); });
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    FirebaseService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"],
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_5__["AngularFireAuth"]])
    ], FirebaseService);
    return FirebaseService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map