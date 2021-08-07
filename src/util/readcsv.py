import pandas as pd

columns = [
	'usuario', 
	'nome', 
	'Tipo de Mercadoria', 
	'Filial', 
	'valor_compra', 
	'Imposto', 
	'Produto Devolvido', 
	'Motivo Devolução'
]

df = pd.read_csv('Desafio - Time de Projetos e Dados - Dados - Questão 1.csv',
	usecols=columns,
	encoding='utf-8'
)

df.dropna(inplace= True)
print(df)
