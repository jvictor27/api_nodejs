# api_nodejs

Construção de uma API bem simples, tendo CRUD's básicos para customer(usuário), product(produtos) e order(pedidos).
A API foi desenvolvida com o intuito de estudar e conhecer um pouco o nodeJS.

* Padrão de arquitetura MVC
* Persistência dos dados em NoSQL usando MongoDB (usando pacote  mongoose)
* Upload de imagem para AMAZON S3
* Autenticação (usando pacote jsonwebtoken)
* Refresh token bem simples
* Autorização

## Configuração

No arquivo  **src/config.js** estão localizadas a pricipais credenciais para fazer o projeto rodar certinho, cada credencial necessária conta com um comentário explicando rapidamente sua necessiadade

```
src/config.js
```


## Testes
### Usuários
>Cadastro de um usuário **POST localhost:3000/customers**
```
{
	"name": "Son Goku",
	"email": "songoku@email.com",
	"password": "123456"
}

```

>Autenticação de um usuário **POST localhost:3000/customers/authenticate**
```
{
	"email": "songoku@email.com",
	"password": "123456"
}

```
### Produtos
Para poder cadastrar, atualizar e deletar um produto é necessário ser um usuário 'admin' e enviar um token para validar e autorizar o usuário. Para obter o token use o recurso **Autenticação de um usuário**

>Cadastro de produtos **POST localhost:3000/products**
```
HEADERS(x-access-token: 'token')
{
	"title": "Violão eagle EMA 663",
	"description": "Violão top",
	"slug": "violão-eagle-ema-663",
	"price": "2000.00",
	"active": "true",
	"tags":["violão", "eagle", "ema-663"],
	"image": "/home/meupc/Imagens/violao-eagle.jpeg"
}

```

>Cadastro de produtos **PUT localhost:3000/products**
```
HEADERS(x-access-token: 'token')
{
	"id": "5ba7bf96f143e72d3822cdc2",
	"title": "mudar nome",
	"description": "mudar nome descrição",
	"slug": "mudar-slug",
	"price": "2500.99"
}

```
>Obter dados do produtos **GET localhost:3000/products**

>Obter dados do produtos, passando o {slug} **GET localhost:3000/products/cadeira-game-top**

>Deletar produtos, passando o {id} **DELETE localhost:3000/products/5ba7c1d15cf5c61c70c39f65**


### Pedidos
Para poder cadastrar um pedido é necessário ser um usuário 'admin' e enviar um token para validar e autorizar o usuário. Para obter o token use o recurso **Autenticação de um usuário**

>Cadastro de pedido **POST localhost:3000/orders**
```
HEADERS(x-access-token: 'token')
{
	"items": [
		{
			"quantity": "2",
			"price": "3000.00",
			"product": "5ba7c1d15cf5c61c70c39f65"
		},
		{
			"quantity": "1",
			"price": "1500.99",
			"product": "5bf176aa0fb09f2cc54713b6"
		}
	]
}

```
