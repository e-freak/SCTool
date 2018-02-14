/**
 * guest-controller-test.js
 */

import assert from 'assert';

import GuestController from '../../../app/script/controller/guest-controller.js';
import MockView from '../mock-view';

describe('[Class] GustController', () => {
    describe('[Method] initialize()', () => {
        it('[正常] 通常処理', () => {
            const view = createMockView();
            const controller = createGuestController(view);

            controller.initialize();

            assert.strictEqual(view.getElementByIdList.length, 1);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'guest-form-add-button');
            assert.strictEqual(view.getElementByIdList[0].element.addEventListenerList.length, 1);
            assert.strictEqual(view.getElementByIdList[0].element.addEventListenerList[0].listener.name, 'bound _onClickAddButton');
        });
    });


    function createGuestController(view) {
        return new GuestController(view);
    }


    function createMockView() {
        return new MockView();
    }



});