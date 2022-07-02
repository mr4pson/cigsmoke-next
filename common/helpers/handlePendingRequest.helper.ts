import { TCategoryState } from 'common/interfaces/types';

const handlePending = (state: TCategoryState) => {
    state.loading = true;
    console.log('pending')
}

const handleChangePending = (state: TCategoryState) => {
    state.saveLoading = true;
    console.log('pending')
}

export { handleChangePending, handlePending }