import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/button';
import { styles } from './style';


export interface TransactionModal extends Omit<Props, 'transactionsList'> {
  transaction: Transaction;
}

export interface Props {
  transactionsList: Transaction[];
  edit: (id: Transaction['id']) => void;
  exclude: (id: Transaction['id']) => void;
}

interface Transaction {
  id?: string;
  type: 'Credit' | 'Debit';
  value: number;
  date: string;
  from?: string;
  to?: string;
}

const TransactionItem = (transactionModal: TransactionModal) => {
  const {edit, transaction, exclude} = transactionModal;
  const {id, date, to, from, value, type} = transaction;

  const styleValue = type === 'Credit' ? styles.Credit : styles.Debit;
  const styleIcon = type === 'Credit' ? styles.iconCredit : styles.iconDebit;

  return (
    <View style={styles.transaction}>
      <View style={styles.title}>
        <View style={{...styles.icon, ...styleIcon}}>
          <FontAwesomeIcon size={26}
                           icon={type === 'Credit' ? faArrowTrendUp : faArrowTrendDown}/>
        </View>
        <View style={styles.listTitle}>
          <Text>{type === 'Credit' ? 'Entrada' : 'Saida'}</Text>
          {to && <Text>{to}</Text>}
          {from && <Text>{from}</Text>}
        </View>

      </View>
      <View style={styles.description}>
        <View>
          <Text>{format(new Date(date), 'dd/MM/yyyy')}</Text>
          <Text style={{...styles.price, ...styleValue}}>{'R$ ' + value}</Text>
        </View>
        <View style={styles.edit}>
          <Button variant={'ghost'} style={styles.buttonTransaction} onPress={() => {
            edit(id);
          }} icon={(<FontAwesomeIcon size={12} color={'#635D6C'} icon={faPen}/>)}/>
          <Button variant={'ghost'} style={styles.buttonTransaction} onPress={() => {
            exclude(id);
          }} icon={(<FontAwesomeIcon size={12} color={'#635D6C'} icon={faTrash}/>)}/>

        </View>
      </View>

    </View>
  );
};

export default TransactionItem;