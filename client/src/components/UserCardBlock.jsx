import React from 'react'
import styled from 'styled-components';

const UserCardBlock = (props) => {
  
  const renderItmes = () => (
    props.products && props.products.map((product, idx) => (
      <tr key={idx}>
        <td>
          <img src={product.selectedFile} />
        </td>
        <td>
          {product.price ? `${product.price.toLocaleString()}원(won)` : ''}
        </td>
        <td>
          <button onClick={() => props.removeItem(product._id)}>삭제하기</button>
        </td>
      </tr>
    ))
  )

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>상품 이미지</th>
            <th>상품 가격</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {renderItmes()}
        </tbody>
      </table>
    </Container>
  )
}

export default UserCardBlock

const Container = styled.div`
  margin-top: 20px;

  table{
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th{
    border: 1px solid #ddd;
    text-align: left;
    padding: 10px;
  }

  img{
    width: 100px;
  }

  tr:nth-child(even){
    background-color: #ddd;
  }

`;