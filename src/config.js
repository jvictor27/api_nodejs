global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = '<strong>{0}</strong>'; // template de e-mail simples

module.exports = {
	connectionString: 'mongodb://jvictor:victor272727@ds020208.mlab.com:20208/api_nodejs', // Mantive a as credenciais do banco, por se tratar apenas de um banco de teste
	sendgridKey: '', // será usado para enviar e-mail (funcionalidade a ser implementada)
	containerConnectionString: '',
	awsAccessKeyId: '', // ID de chave do acesso para poder acessar o conjunto de recursos da AWS pré-configurados, como um bucket do S3, que será usado nesse projeto.
	awsSecretAccessKey: '', // É a parte secreta do ID da chave de acesso. Pense nisso como uma senha para um ID de chave de acesso específico (eles devem ser usados ​​sempre em pares)
	bucketImageName: '' // É uma unidade de armazenamento do serviço S3 da Amazon. Você pode armazenar diferentes tipos de arquivos (dados) e ter metadados que descrevam os dados ou arquivos reais.
}