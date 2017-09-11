import { Injectable } from '@angular/core';

@Injectable()
export class MenuSistemaService {

  constructor() { }

  getMenus() {
    let menu = [
      {
        title: "Home",
        classIcon: "fa fa-home",
        url: "/home"
      },
      {
        title: "Suporte",
        classIcon: "fa fa-life-ring",
        itens: [{
          name: "usuarios-logados",
          classIcon: "fa fa-users",
          url: "/suporte/usuarios-logados",
          title: "Usuários Logados",
          subTitle: "Usuários logados atualmente no sistema",
          crud: false
        }]
      }, {
        // Tabelas Básicas
        title: "Tabelas Básicas",
        classIcon: "fa fa-wpforms",
        itens: [{
          name: "porta",
          classIcon: "fa fa-folder-open fa-rotate-90",
          title: "Portas",
          subTitle: "Cadastro de Portas do condomínio",
          url: "tabelas-basicas/porta"
        }, {
          url : "tabelas-basicas/areacomum",
          classIcon: "fa fa-universal-access",
          title: "Áreas Comuns",
          subTitle: "Cadastro de Áreas Comuns do condomínio"
        }]
      }, {
        // Acesso
        name: "acesso",
        title: "Acesso",
        classIcon: "fa fa-unlock",
        itens: [{
          name: "perfil",
          classIcon: "fa fa-users",
          title: "Perfil de Usuário",
          subTitle: "Perfis de acesso para os usuários deste sistema"
        }, {
          name: "usuario",
          title: "Usuário",
          classIcon: "fa fa-user",
          subTitle: "Usuários para operar este sistema"
        }]
      }, {
        // Portaria
        name: "portaria",
        title: "Portaria",
        classIcon: "icofont icofont-police",
        itens: [{
          name: "liberacao",
          url: "/liberacao",
          title: "Liberação de acesso",
          classIcon: "icofont icofont-barricade",
          subTitle: "Liberação de acesso às dependências do condomínio"
        }]
      }, {
        // Cadastros
        name: "cadastros",
        title: "Cadastros",
        classIcon: "icon-settings",
        itens: [{
          title: "Torres",
          url : "cadastros/torre",
          classIcon: "fa fa-hospital-o",
          subTitle: "Torres do condomínio"
        }, {
          title: "Blocos",
          url : "cadastros/bloco",
          classIcon: "fa fa-th-large",
          subTitle: "Blocos do condomínio"
        }, {
          title: "Unidades",
          url: "cadastros/unidade",
          classIcon: "fa fa-home",
          subTitle: "Unidades / Apartamentos / Casas"
        }, {
          title: "Tipos de Pessoa",
          url : "cadastros/tipo-pessoa",
          classIcon: "fa fa-home",
          subTitle: "Tipos de Pessoas Cadastradas"
        }, {
          title: "Visitantes / Prestadores",
          classIcon: "fa fa-user",
          subTitle: "Visitantes / Prestadores de serviço do condomínio"
        }, {
          name: "morador",
          title: "Moradores",
          classIcon: "fa fa-home",
          subTitle: "Moradores do condomínio"
        }, {
          name: "veiculo",
          title: "Veículos",
          classIcon: "fa fa-car",
          subTitle: "Veículos dos Moradores do condomínio"
        }]
      }, {
        name: "acesso",
        title: "Sair",
        classIcon: "fa fa-sign-out",
        url: "/acesso"
      }
    ];

    return menu;
  }
}
