const COHORTNAME = '2302-ACC-CT-WEB-PT-A'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORTNAME}/`
const API = `${BASE_URL}/${COHORTNAME}`

async function apiCall () {
    try {
        const response = await fetch(API)
        const result = await response.json()
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}



export default COHORTNAME