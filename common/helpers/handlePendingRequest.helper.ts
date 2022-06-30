import { categoryState } from 'common/interfaces/types';

const handlePending = (state: categoryState) => {
    state.loading = true;
    console.log('pending')
}

const handleChangePending = (state: categoryState) => {
    state.saveLoading = true;
    console.log('pending')
}

export { handleChangePending, handlePending }