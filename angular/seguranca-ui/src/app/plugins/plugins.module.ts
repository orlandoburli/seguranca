import { BotaoAlterarComponent } from './forms/buttons/botao-alterar.component';
import { BotaoGridExcluirComponent } from './forms/buttons/botao-grid-excluir.component';
import { BotaoGridAlterarComponent } from './forms/buttons/botao-grid-alterar.component';
import { BotaoExcluirComponent } from './forms/buttons/botao-excluir.component';
import { BotaoVoltarComponent } from './forms/buttons/botao-voltar.component';
import { BotaoSalvarComponent } from './forms/buttons/botao-salvar.component';
import { BotaoLimparPesquisaComponent } from './forms/buttons/botao-limpar-pesquisa.component';
import { BotaoPesquisarComponent } from './forms/buttons/botao-pesquisar.component';
import { MensagemService } from './forms/mensagem.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableComponent, ButtonsRightComponent } from './data-table/data-table.component';
import { ColumnComponent } from './data-table/column/column.component';
import { PaginatorComponent } from './data-table/paginator/paginator.component';
import { PanelComponent } from './forms/panel/panel.component';
import { ColumnTemplateComponent } from './data-table/column-template/column-template.component';
import { InputGroupComponent } from './forms/input-group/input-group.component';
import { SelectGroupComponent } from './forms/select-group/select-group.component';

import { RowComponent, ColSm1Component, ColSm2Component, ColSm3Component, ColSm4Component, ColSm5Component, ColSm6Component, ColSm7Component, ColSm8Component, ColSm9Component, ColSm10Component, ColSm11Component, ColSm12Component } from './forms/grid/grid-system.component';
import { BotaoNovoComponent } from './forms/buttons/botao-novo.component';

import { TextMaskModule } from 'angular2-text-mask';
//import { Select2Module } from 'ng2-select2';

// import {  } from 'text-mask-core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule
  //  Select2Module
  ],
  providers: [MensagemService],
  declarations: [DataTableComponent,
    ButtonsRightComponent,
    ColumnComponent,
    PaginatorComponent,
    PanelComponent,
    ColumnTemplateComponent,
    InputGroupComponent,
    SelectGroupComponent,
    RowComponent,

    ColSm1Component,
    ColSm2Component,
    ColSm3Component,
    ColSm4Component,
    ColSm5Component,
    ColSm6Component,
    ColSm7Component,
    ColSm8Component,
    ColSm9Component,
    ColSm9Component,
    ColSm10Component,
    ColSm11Component,
    ColSm12Component,

    BotaoNovoComponent,
    BotaoPesquisarComponent,
    BotaoLimparPesquisaComponent,
    BotaoSalvarComponent,
    BotaoVoltarComponent,
    BotaoExcluirComponent,
    BotaoAlterarComponent,
    BotaoGridAlterarComponent,
    BotaoGridExcluirComponent],
  exports: [DataTableComponent,
    ButtonsRightComponent,
    ColumnComponent,
    PanelComponent,
    InputGroupComponent,
    SelectGroupComponent,
    RowComponent,

    ColSm1Component,
    ColSm2Component,
    ColSm3Component,
    ColSm4Component,
    ColSm5Component,
    ColSm6Component,
    ColSm7Component,
    ColSm8Component,
    ColSm9Component,
    ColSm9Component,
    ColSm10Component,
    ColSm11Component,
    ColSm12Component,

    BotaoNovoComponent,
    BotaoPesquisarComponent,
    BotaoLimparPesquisaComponent,
    BotaoSalvarComponent,
    BotaoVoltarComponent,
    BotaoExcluirComponent,
    BotaoAlterarComponent,
    BotaoGridAlterarComponent,
    BotaoGridExcluirComponent]
})
export class PluginsModule { }
