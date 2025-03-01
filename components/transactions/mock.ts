interface Transaction {
  id?: string;
  type: 'Credit' | 'Debit';
  value: number;
  date: string;
  from?: string;
  to?: string;
}

export const transactionsMOCK: Transaction[] = [
  {
    id: '1',
    type: 'Credit',
    value: 100,
    date: '2021-10-10',
    from: 'John Doe',
    to: 'Jane Doe',
  },
  {
    id: '2',
    type: 'Debit',
    value: 50,
    date: '2021-10-11',
    from: 'Jane Doe',
    to: 'John Doe',
  },
  {
    id: '3',
    type: 'Credit',
    value: 200,
    date: '2021-10-12',
    from: 'John Doe',
    to: 'Jane Doe',
  },
  {
    id: '4',
    type: 'Debit',
    value: 75,
    date: '2021-10-13',
    from: 'Jane Doe',
    to: 'John Doe',
  },
  {
    id: '5',
    type: 'Credit',
    value: 150,
    date: '2021-10-14',
    from: 'John Doe',
    to: 'Jane Doe',
  },
  {
    id: '6',
    type: 'Debit',
    value: 25,
    date: '2021-10-15',
    from: 'Jane Doe',
    to: 'John Doe',
  },
  {
    id: '7',
    type: 'Credit',
    value: 300,
    date: '2021-10-16',
    from: 'John Doe',
    to: 'Jane Doe',
  },
  {
    id: '8',
    type: 'Debit',
    value: 100,
    date: '2021-10-17',
    from: 'Jane Doe',
    to: 'John Doe',
  },
  {
    id: '9',
    type: 'Credit',
    value: 250,
    date: '2021-10-18',
    from: 'John Doe',
    to: 'Jane Doe',
  },
  {
    id: '10',
    type: 'Debit',
    value: 125,
    date: '2021-10-19',
    from: 'Jane Doe',
    to: 'John Doe',
  },
  {
    id: '11',
    type: 'Credit',
    value: 350,
    date: '2021-10-19',
    from: 'Jane Doe',
    to: 'John Doe',
  },
];