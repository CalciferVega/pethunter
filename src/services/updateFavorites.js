import { doc, getDoc, updateDoc, setDoc, getFirestore } from "firebase/firestore";

async function updateFavorites(id) {
  const db = getFirestore();
  let uid = sessionStorage.getItem('User Id');
  let ref = doc(db, 'users', uid);

  await getDoc(ref)
    .then((response) => {
      let favorites = response?.data()?.myFavorites;

      if (!favorites) {
        let firstFavorite = { myFavorites: [id] };
        setDoc(ref, firstFavorite)
      }
      if (favorites?.find(pet => pet === id)) {
        let newFavorites = favorites.filter(pet => pet !== id);
        updateDoc(ref, { myFavorites: newFavorites });
      } else {
        let newFavorites = [...favorites, id];
        updateDoc(ref, { myFavorites: newFavorites });
      }
    }).catch(error => {
      console.log(error);
    })
}
export default updateFavorites;