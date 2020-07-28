import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase/index';

const productsRef = db.collection('products')

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      name: name,
      description: description,
      category: category,
      gender: gender,
      images: images,
      price: parseInt(price, 10),
      sizes: sizes,
      updated_at: timestamp
    }

    if (id === "") {
      const ref = productsRef.doc()
      id = ref.id
      data.id = id
      data.created_at = timestamp
    }

    return productsRef.doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push("/"))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}

