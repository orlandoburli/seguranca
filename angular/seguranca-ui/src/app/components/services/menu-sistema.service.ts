import { Injectable } from '@angular/core';

export class Menu {
  title?: string;
  initials?: string;
  classIcon?: string;
  url?: string;
  name: string;
  subTitle?: string;
  // crud = false;
  itens?: Menu[];
}

@Injectable()
export class MenuSistemaService {

  constructor() { }

  getMenus(): Menu[] {
    const menus: Menu[] = [
      {
        title: 'Home',
        classIcon: 'fa fa-home',
        url: '/dashboard/home',
        name: 'home'
      },
      {
        name: 'suporte',
        title: 'Suporte',
        classIcon: 'fa fa-life-ring',
        itens: [{
          name: 'usuarios-logados',
          classIcon: 'fa fa-users',
          url: '/suporte/usuarios-logados',
          title: 'Usuários Logados',
          subTitle: 'Usuários logados atualmente no sistema'
        }]
      }, {
        // Tabelas Básicas
        title: 'Tabelas Básicas',
        name: 'tabelas-basicas',
        classIcon: 'fa fa-wpforms',
        itens: [{
          name: 'porta',
          classIcon: 'fa fa-folder-open fa-rotate-90',
          title: 'Portas',
          subTitle: 'Cadastro de Portas do condomínio',
          url: 'tabelas-basicas/porta'
        }, {
          name: 'areacomum',
          url: 'tabelas-basicas/areacomum',
          classIcon: 'fa fa-universal-access',
          title: 'Áreas Comuns',
          subTitle: 'Cadastro de Áreas Comuns do condomínio'
        }]
      }, {
        // Acesso
        name: 'acesso',
        title: 'Acesso',
        classIcon: 'fa fa-unlock',
        itens: [{
          name: 'perfil',
          classIcon: 'fa fa-users',
          title: 'Perfil de Usuário',
          url: 'acesso/perfil',
          subTitle: 'Perfis de acesso para os usuários deste sistema'
        }, {
          name: 'usuario',
          title: 'Usuário',
          classIcon: 'fa fa-user',
          url: 'acesso/usuario',
          subTitle: 'Usuários para operar este sistema'
        }]
      }, {
        // Portaria
        name: 'portaria',
        title: 'Portaria',
        classIcon: 'icofont icofont-police',
        itens: [{
          name: 'liberacao',
          url: '/portaria/liberacao-acesso',
          title: 'Liberação de acesso',
          classIcon: 'icofont icofont-barricade',
          subTitle: 'Liberação de acesso às dependências do condomínio'
        }]
      }, {
        // Cadastros
        name: 'cadastros',
        title: 'Cadastros',
        classIcon: 'fa fa-cogs',
        itens: [{
          name: 'torres',
          title: 'Torres',
          url: 'cadastros/torre',
          classIcon: 'fa fa-hospital-o',
          subTitle: 'Torres do condomínio'
        }, {
          name: 'blocos',
          title: 'Blocos',
          url: 'cadastros/bloco',
          classIcon: 'fa fa-th-large',
          subTitle: 'Blocos do condomínio'
        }, {
          name: 'unidades',
          title: 'Unidades',
          url: 'cadastros/unidade',
          classIcon: 'fa fa-home',
          subTitle: 'Unidades / Apartamentos / Casas'
        }, {
          name: 'tipo-pessoa',
          title: 'Tipos de Pessoa',
          url: 'cadastros/tipo-pessoa',
          classIcon: 'fa fa-home',
          subTitle: 'Tipos de Pessoas Cadastradas'
        }, {
          name: 'visitantes',
          title: 'Visitantes / Prestadores',
          url: 'cadastros/pessoa',
          classIcon: 'fa fa-user',
          subTitle: 'Visitantes / Prestadores de serviço do condomínio'
        }, {
          name: 'morador',
          title: 'Moradores',
          url: 'cadastros/morador',
          classIcon: 'fa fa-home',
          subTitle: 'Moradores do condomínio'
        }, {
          name: 'veiculo',
          title: 'Veículos',
          url: 'cadastros/veiculo',
          classIcon: 'fa fa-car',
          subTitle: 'Veículos dos Moradores do condomínio'
        }]
      }, {
        name: 'acesso',
        title: 'Sair',
        classIcon: 'fa fa-sign-out',
        url: '/logoff'
      }
    ];

    return menus;
  }
}
