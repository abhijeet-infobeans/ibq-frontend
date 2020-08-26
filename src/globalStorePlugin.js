/**
 * A global plugin to share states or data between components
 */
const GlobalStorePlugin = {
    install (Vue) {
        Vue.prototype.$globalStates = new Vue({
            data () {
                return {
                    notification: {
                        text: '',
                        type: '', // error, success, info, warning
                        init_notifications: false
                    },
                    showSideDrawer: true
                }
            },
            computed: {
                // computed props
            },
            methods: {
                // Methods
                /**
                 * Helper method to extract USA item from country list and prepend as first item
                 */
                makeUSAAsFirstItem (objList) {
                    let usaItemList = []
                    let itemWithoutUSAList = []
                    let newCList = []
                    for (let itm of objList) {
                        if (itm.abbreviation === 'USA') {
                            usaItemList.push(itm)
                        } else {
                            itemWithoutUSAList.push(itm)
                        }
                    }
                    newCList = usaItemList.concat(itemWithoutUSAList)
                    return newCList
                },
                /**
                 * Helper method to extract NA item from adoption list and prepend as first item
                 */
                makeNAAsFirstItem (objList) {
                    const selectedElement = (objList) => objList.name === 'NA'
                    let naIndex = objList.findIndex(selectedElement)
                    if (naIndex > -1) {
                        let temp = objList[naIndex]
                        objList[naIndex] = objList[0]
                        objList[0] = temp
                        return objList
                    } else {
                        return objList
                    }
                },
                /**
                 * Helper method to slice logo URL from jurisdiction item and set it as logo Name
                 */
                fetchImgNameFromImgURL (fileAddress) {
                    if (fileAddress) {
                        const logoName = fileAddress.slice(fileAddress.lastIndexOf('/') + 1)
                        return logoName
                    } else {
                        return null
                    }
                },
                /**
                 * Helper method to replace with space if any capital letter found
                 */
                splitFromFirstCapitalChar (str) {
                    return str.replace(/([A-Z]+)/g, ' $1')
                },
                /**
                 * Helper method to extract International Code Council(ICC) item from
                 * Publisher list and prepend as first item
                 * Matching would be done by publisher acronym
                 */
                makeICCAsFirstItem (objList) {
                    let iccItemList = []
                    let itemWithoutICCList = []
                    let newCList = []
                    for (let itm of objList) {
                        if (itm.acronym === 'ICC') {
                            iccItemList.push(itm)
                        } else {
                            itemWithoutICCList.push(itm)
                        }
                    }
                    newCList = iccItemList.concat(itemWithoutICCList)
                    return newCList
                }
            }
        })
    }
}

export default GlobalStorePlugin
