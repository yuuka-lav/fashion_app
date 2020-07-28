import React, { useState, useCallback, useEffect } from 'react';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../reducks/products/operations';
import ImageArea from '../components/Products/ImageArea';
import { db } from '../firebase/index';


const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split('/product/edit')[1];

  if (id !== "") {
    id = id.split('/')[1]
  }

  const [images, setImages] = useState([]),
        [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [price, setPrice] = useState("");
  
  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName])
  
  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [setDescription])

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value)
  }, [setPrice])

  const categories = [
    {id: "tops", name: "トップス"},
    {id: "tops", name: "トップス"},
    {id: "tops", name: "トップス"},
    {id: "tops", name: "トップス"},
  ]

  const genders = [
    {id: "man", name: "メンズ"},
    {id: "woman", name: "レディース"},
    {id: "all", name: "全て"},
  ]

  useEffect(() => {
    if (id !== "") {
      db.collection('products').doc(id).get()
        .then(snapshot => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setPrice(data.price);
        })
    }
  },[id]);

  return(
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={ images } setImages={ setImages }/>
        <TextInput 
          label={ "商品名" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ name }
          type={ "text" }
          required={ true }
          onChange={ inputName }
        />
        <TextInput 
          label={ "商品説明" }
          fullWidth={ true }
          multiline={ true }
          rows={ 5 }
          value={ description }
          type={ "text" }
          required={ true }
          onChange={ inputDescription }
        />

        <SelectBox 
          label={ "カテゴリー" }
          value={ category }
          options={ categories }
          required={ true }
          select={ setCategory }
        />

        <SelectBox 
          label={ "性別" }
          value={ gender }
          options={ genders }
          required={ true }
          select={ setGender }
        />

        <TextInput 
          label={ "価格" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ price }
          type={ "number" }
          required={ true }
          onChange={ inputPrice }
        />

      <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton 
            label={ "商品を登録する" }
            onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images))}
          />
        </div>
      </div>
    </section>
  )
}


export default ProductEdit