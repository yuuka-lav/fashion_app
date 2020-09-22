import React from 'react'
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../components/UIkit';

const OrderComplete = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2 className="u-text__headline u-text-center">購入が完了しました。</h2>
      <div className="center">
        <PrimaryButton 
          label={ "商品一覧画面に戻る" }
          onClick={() => dispatch(push('/'))}
        />
      </div>
    </div>
  )
}

export default OrderComplete;
