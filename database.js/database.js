import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('pedidos.db');

export const criarTabelas = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        preco REAL
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS vendedor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        telefone TEXT
      );`
    );
  });
};

export const inserirProduto = (nome, preco) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO produtos (nome, preco) VALUES (?, ?);', [nome, preco]);
  });
};

export const listarProdutos = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM produtos;', [], (_, { rows }) => {
      callback(rows._array);
    });
  });
};

export const salvarTelefoneVendedor = (telefone) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM vendedor;'); // Limpa antes de salvar novo
    tx.executeSql('INSERT INTO vendedor (telefone) VALUES (?);', [telefone]);
  });
};

export const buscarTelefoneVendedor = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT telefone FROM vendedor LIMIT 1;', [], (_, { rows }) => {
      callback(rows.length > 0 ? rows.item(0).telefone : '');
    });
  });
};