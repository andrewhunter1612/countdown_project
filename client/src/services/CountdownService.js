const baseURL = 'http://localhost:3000/api/conundrum-words/'

export default {
    getConundrumWords() {
      return fetch(baseURL)
        .then(res => res.json())
    },

    addRoom(room){
      return fetch(baseURL, {
        method: 'POST', 
        body: JSON.stringify(room),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
    },

    addUserToRoom(user, room){
      return fetch(baseURL + room, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
    },

    deleteRoom(room){
      return fetch(baseURL + room, {
        method: 'DELETE'
      })
    }

}

