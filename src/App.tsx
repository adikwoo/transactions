import React, { useState } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
`;

const FormContainer = styled.div`
  max-width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const FormField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }

  textarea {
    height: 100px;
    resize: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #218838;
  }
`;

const ExpenseForm: React.FC = () => {
  const [dateTime, setDateTime] = useState('');
  const author = 'Adil';
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');

  const categories = ['Еда', 'Транспорт', 'Развлечения'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expense = {
      dateTime,
      author,
      sum,
      category,
      comment,
    };

    const response = await fetch('http://localhost:4200/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });

    if (response.ok) {
      alert('Расход добавлен!');
      setDateTime('');
      setSum('');
      setCategory('');
      setComment('');
    } else {
      alert('Ошибка добавления расхода.');
    }
  };

  return (
    <AppContainer>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label>Дата:</label>
            <input
              type="date"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <label>Сумма:</label>
            <input
              type="number"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <label>Категория:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </FormField>
          <FormField>
            <label>Комментарий:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormField>
          <SubmitButton type="submit">Добавить расход</SubmitButton>
        </form>
      </FormContainer>
    </AppContainer>
  );
};

export default ExpenseForm;
