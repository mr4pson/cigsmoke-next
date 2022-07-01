import { createNewCategory, editCategory } from "redux/slicers/categoriesSlicer"
import { setName, setParent, setUrl } from "redux/slicers/chosenCategoryToEdit"
import { Page, paths } from "routes/constants"

const handleNameChange = (event, dispatch) => {
    dispatch(setName(event.target.value)) 
}

const handleUrlChange = (event, dispatch) => {
    dispatch(setUrl(event.target.value)) 
}

const handleParentChange = (event, dispatch) => {
    dispatch(setParent(event)) 
}

const handleCanselButton = (router) => {
    router.push(paths[Page.CATEGORIES])
}

const handleRedirect = (router, isSaved) => {
    if(!isSaved.error) {
      router.push(paths[Page.CATEGORIES])
    }
}

const handleConfirmEditCategory = async(router, dispatch, chosenCategory) => {
    const isSaved: any = await dispatch(editCategory({
        name: chosenCategory.name,
        url: chosenCategory.url,
        parent: chosenCategory.parent.id,
        id: router.query.id,
    }))
    handleRedirect(router, isSaved)
}

const handleConfirmCreateCategory = async(router, dispatch, chosenCategory) => {
    const isSaved: any = await dispatch(createNewCategory({
        name: chosenCategory.name,
        url: chosenCategory.url,
        parent: chosenCategory.parent.id,
    }))
    handleRedirect(router, isSaved)
  }

export { handleNameChange, handleUrlChange, handleParentChange, handleCanselButton, handleConfirmCreateCategory, handleConfirmEditCategory }