providers.provider('MenuProvider', function() {
	// Define uma classe hierarquica para montar o objeto de menu.
	var menu = [
		{
			name : "suporte",
			title : "Suporte",
			classIcon : "fa fa-life-ring",
			itens : [{
				name : "usuarios-logados",
				classIcon : "fa fa-users",
				url : "/suporte/usuarios-logados",
				title : "Usuários Logados",
				subTitle : "Usuários logados atualmente no sistema",
				controller : "UsuariosLogadosController",
				templateUrl : "views/suporte/usuarios_logados.html",
				crud : false
			}]
		}, {
			// Tabelas Básicas
			name : "tabelasbasicas",
			title : "Tabelas Básicas",
			classIcon : "fa fa-wpforms",
			itens : [{
				name : "porta",
				classIcon : "fa fa-folder-open fa-rotate-90",
				title : "Portas",
				subTitle : "Cadastro de Portas do condomínio",
				controller : "PortaController",
				crud : true
			}, {
				name : "areacomum",
				classIcon : "fa fa-universal-access",
				title : "Áreas Comuns",
				subTitle : "Cadastro de Áreas Comuns do condomínio",
				controller : "AreaComumController",
				crud : true
			}]
		}, {
			// Acesso
			name : "acesso",
			title : "Acesso",
			classIcon : "fa fa-unlock",
			itens : [{
				name : "perfil",
				classIcon : "fa fa-users",
				title : "Perfil de Usuário",
				subTitle : "Perfis de acesso para os usuários deste sistema",
				controller : "PerfilController",
				crud : true
			},{
				name : "usuario",
				title : "Usuário",
				classIcon : "fa fa-user",
				subTitle : "Usuários para operar este sistema",
				controller : "UsuarioController",
				crud : true
			}]
		}, {
			// Portaria
			name : "portaria",
			title : "Portaria",
			classIcon : "icofont icofont-police",
			itens : [{
				name : "liberacao",
				url : "/liberacao",
				title : "Liberação de acesso",
				classIcon : "icofont icofont-barricade",
				subTitle : "Liberação de acesso às dependências do condomínio",
				controller : "LiberacaoController",
				templateUrl : "/views/portaria/liberacao.html",
				crud : false
			}]
		}, {
			// Cadastros
			name : "cadastros",
			title : "Cadastros",
			classIcon : "icon-settings",
			itens :[{
				name : "torre",
				title : "Torres",
				classIcon : "fa fa-hospital-o",
				subTitle : "Torres do condomínio",
				controller : "TorreController",
				crud : true
			}, {
				name : "bloco",
				title : "Blocos",
				classIcon : "fa fa-th-large",
				subTitle : "Blocos do condomínio",
				controller : "BlocoController",
				crud : true
			}, {
				name : "unidade",
				title : "Unidades",
				classIcon : "fa fa-home",
				subTitle : "Unidades / Apartamentos / Casas",
				controller : "UnidadeController",
				crud : true
			}, {
				name : "unidade_multiplos",
				url : "/unidade-multiplos/",
				title : "Unidades - Cadastro mútiplo",
				classIcon : "fa fa-home",
				subTitle : "Unidades / Apartamentos / Casas",
				controller : "UnidadeController",
				templateUrl : "/views/cadastros/unidade_cadastro_multiplos.html",
				crud : false,
				notShowInMenu : true
			}, {
				name : "tipopessoa",
				title : "Tipos de Pessoa",
				classIcon : "fa fa-home",
				subTitle : "Tipos de Pessoas Cadastradas",
				controller : "TipoPessoaController",
				crud : true
			}, {
				name : "pessoa",
				title : "Visitantes / Prestadores",
				classIcon : "fa fa-user",
				subTitle : "Visitantes / Prestadores de serviço do condomínio",
				controller : "PessoaController",
				crud : true
			}, {
				name : "morador",
				title : "Moradores",
				classIcon : "fa fa-home",
				subTitle : "Moradores do condomínio",
				controller : "MoradorController",
				crud : true
			}, {
				name : "veiculo",
				title : "Veículos",
				classIcon : "fa fa-car",
				subTitle : "Veículos dos Moradores do condomínio",
				controller : "VeiculoController",
				crud : true
			}]
		}, {
			name : "acesso",
			title : "Sair",
			classIcon : "fa fa-sign-out",
			url : "/acesso"
		}
	];

	this.$get = function() {
		return {
			"menu" : menu
		}
	}
});