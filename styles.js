import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: `green`,
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonConfirm: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    padding: 12,
    backgroundColor: '#eaeaea',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
  sacolaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 5,
    borderRadius: 8,
  },
  remove: {
    color: 'red',
    fontWeight: 'bold',
  },
  empty: {
    fontStyle: 'italic',
    color: '#777',
  },
});
