import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import OpenAnything from 'react-native-openanything';

// Importações do banco de dados
import {
  criarTabelas,
  inserirProduto,
  listarProdutos,
  salvarTelefoneVendedor,
  buscarTelefoneVendedor
} from './database';
import { styles } from './styles';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [sacola, setSacola] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // 🔁 useEffect será executado quando o app iniciar
  useEffect(() => {
    criarTabelas();
    buscarTelefoneVendedor(setWhatsapp);
    listarProdutos(setProdutos);
  }, []);

  const adicionarProduto = () => {
    if (!nomeProduto || !precoProduto) {
      Alert.alert('Campos vazios', 'Preencha nome e preço do produto');
      return;
    }
    const novoProduto = {
      nome: nomeProduto,
      preco: parseFloat(precoProduto),
    };
    inserirProduto(novoProduto, () => {
      listarProdutos(setProdutos);
      setNomeProduto('');
      setPrecoProduto('');
    });
  };

  const adicionarSacola = (produto) => {
    setSacola([...sacola, produto]);
  };

  const removerSacola = (index) => {
    const novaSacola = [...sacola];
    novaSacola.splice(index, 1);
    setSacola(novaSacola);
  };

  const confirmarPedido = () => {
    if (sacola.length === 0) {
      Alert.alert('Sacola vazia', 'Adicione produtos antes de confirmar o pedido.');
      return;
    }

    const mensagem = sacola
      .map(p => `• ${p.nome} - R$${p.preco.toFixed(2)}`)
      .join('\n');

    const total = sacola.reduce((sum, p) => sum + p.preco, 0);

    const textoFinal = `Olá! Gostaria de fazer um pedido:\n${mensagem}\n\nTotal: R$${total.toFixed(2)}`;

    OpenAnything.Whatsapp(whatsapp, textoFinal);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar Produto</Text>

      <TextInput
        placeholder="Nome do produto"
        style={styles.input}
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />
      <TextInput
        placeholder="Preço"
        style={styles.input}
        value={precoProduto}
        keyboardType="numeric"
        onChangeText={setPrecoProduto}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarProduto}>
        <Text style={styles.buttonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Número do Vendedor (WhatsApp)</Text>
      <TextInput
        placeholder="Ex: 5599988887777"
        style={styles.input}
        value={whatsapp}
        keyboardType="phone-pad"
        onChangeText={(numero) => {
          setWhatsapp(numero);
          salvarTelefoneVendedor(numero);
        }}
      />

      <Text style={styles.title}>Lista de Produtos</Text>
      {produtos.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => adicionarSacola(item)}
        >
          <Text style={styles.itemText}>{item.nome} - R${item.preco}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.title}>Sacola ({sacola.length})</Text>
      {sacola.length === 0 ? (
        <Text style={styles.empty}>Nenhum produto na sacola.</Text>
      ) : (
        sacola.map((item, index) => (
          <View key={index} style={styles.sacolaItem}>
            <Text>{item.nome} - R${item.preco.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removerSacola(index)}>
              <Text style={styles.remove}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <TouchableOpacity style={styles.buttonConfirm} onPress={confirmarPedido}>
        <Text style={styles.buttonText}>Confirmar Pedido no WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}



