import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../constants';

export function openModal(method) {
  return {
    type: OPEN_MODAL,
    method
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
