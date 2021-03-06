/* ---------------------------------------------------------------------- */
/* Script generated with: DeZign for Databases v6.1.0                     */
/* Target DBMS:           PostgreSQL 8.3                                  */
/* Project file:          modelagem_2.dez                                 */
/* Project name:                                                          */
/* Author:                                                                */
/* Script type:           Database creation script                        */
/* Created on:            2017-08-15 22:36                                */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Tables                                                                 */
/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* Add table "pessoa"                                                     */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.pessoa (
    id UUID  NOT NULL,
    nome CHARACTER VARYING(100)  NOT NULL,
    rg CHARACTER VARYING(20),
    orgao_rg CHARACTER VARYING(10),
    cpf CHARACTER VARYING(11),
    cnh CHARACTER VARYING(20),
    celular1 CHARACTER VARYING(12),
    celular2 CHARACTER VARYING(12),
    fone1 CHARACTER VARYING(12),
    fone2 CHARACTER VARYING(12),
    id_tipo_pessoa UUID  NOT NULL,
    cep NUMERIC(8),
    endereco CHARACTER VARYING(200),
    bairro CHARACTER VARYING(100),
    complemento CHARACTER VARYING(100),
    cidade CHARACTER VARYING(100),
    uf CHARACTER(2),
    observacoes TEXT,
    foto TEXT,
    data_cadastro TIMESTAMP DEFAULT now()  NOT NULL,
    data_atualizacao TIMESTAMP,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_pessoa PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "parametros"                                                 */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.parametros (
    chave CHARACTER VARYING(100)  NOT NULL,
    valor CHARACTER VARYING(1000)  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_parametros PRIMARY KEY (chave)
);

/* ---------------------------------------------------------------------- */
/* Add table "tipo_pessoa"                                                */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.tipo_pessoa (
    id UUID  NOT NULL,
    nome CHARACTER VARYING(100)  NOT NULL,
    flg_morador CHARACTER(1)  NOT NULL,
    ativo CHARACTER(1)  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_tipo_pessoa PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "area_comum"                                                 */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.area_comum (
    id UUID  NOT NULL,
    nome CHARACTER VARYING(100)  NOT NULL,
    ativo CHARACTER(1) DEFAULT '''A''::bpchar'  NOT NULL,
    maximo_convidados NUMERIC(3),
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_area_comum PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "liberacao"                                                  */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.liberacao (
    id UUID  NOT NULL,
    data_hora TIMESTAMP  NOT NULL,
    id_usuario UUID  NOT NULL,
    id_porta UUID  NOT NULL,
    tipo_acesso CHARACTER(1)  NOT NULL,
    id_pre_liberacao UUID,
    id_morador_autorizacao UUID,
    tipo_destino CHARACTER(1)  NOT NULL,
    id_unidade_destino UUID,
    id_area_comum UUID,
    forma_autorizacao NUMERIC(1),
    observacoes TEXT,
    foto TEXT,
    id_pessoa UUID  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_liberacao PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "perfil"                                                     */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.perfil (
    id UUID  NOT NULL,
    nome CHARACTER VARYING(100)  NOT NULL,
    ativo CHARACTER(1) DEFAULT '''S''::bpchar'  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_perfil PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "usuario"                                                    */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.usuario (
    id UUID  NOT NULL,
    nome CHARACTER VARYING(100)  NOT NULL,
    login CHARACTER VARYING(50)  NOT NULL,
    senha CHARACTER VARYING(200)  NOT NULL,
    ativo CHARACTER(1) DEFAULT '''S''::bpchar'  NOT NULL,
    id_perfil UUID  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "veiculo"                                                    */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.veiculo (
    id UUID  NOT NULL,
    marca CHARACTER VARYING(100),
    modelo CHARACTER VARYING(100),
    cor CHARACTER VARYING(100),
    placa CHARACTER VARYING(20)  NOT NULL,
    ano NUMERIC(4),
    ativo CHARACTER(1) DEFAULT '''A''::bpchar'  NOT NULL,
    id_morador UUID  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_veiculo PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "morador"                                                    */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.morador (
    id UUID  NOT NULL,
    id_pessoa UUID  NOT NULL,
    id_unidade UUID  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_morador PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "pre_liberacao"                                              */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.pre_liberacao (
    id UUID  NOT NULL,
    data_hora TIMESTAMP  NOT NULL,
    data_liberacao DATE,
    id_morador UUID  NOT NULL,
    id_pessoa UUID  NOT NULL,
    observacoes TEXT,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_pre_liberacao PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "unidade"                                                    */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.unidade (
    id UUID  NOT NULL,
    numero CHARACTER VARYING(100)  NOT NULL,
    id_bloco UUID  NOT NULL,
    id_torre UUID  NOT NULL,
    ativo CHARACTER(1) DEFAULT '''A''::bpchar'  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_unidade PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "porta"                                                      */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.porta (
    id UUID  NOT NULL,
    nome CHARACTER VARYING(100)  NOT NULL,
    ativo CHARACTER(1) DEFAULT '''A''::bpchar'  NOT NULL,
    tipo CHARACTER(1)  NOT NULL,
    comando CHARACTER VARYING(200),
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_porta PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "bloco"                                                      */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.bloco (
    id UUID  NOT NULL,
    nome CHARACTER VARYING(100)  NOT NULL,
    ativo CHARACTER(1) DEFAULT '''A''::bpchar'  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_bloco PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "torre"                                                      */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.torre (
    id UUID  NOT NULL,
    nome CHARACTER VARYING(100)  NOT NULL,
    ativo CHARACTER(1) DEFAULT '''A''::bpchar'  NOT NULL,
    quantidade_andares NUMERIC(2),
    unidades_por_andar NUMERIC(2),
    flag_terreo CHARACTER(1) DEFAULT '''S''::bpchar'  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT pk_torr PRIMARY KEY (id)
);

/* ---------------------------------------------------------------------- */
/* Add table "empresa"                                                    */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.empresa (
    id_empresa UUID  NOT NULL,
    nome CHARACTER VARYING(200)  NOT NULL,
    ativo CHARACTER(1)  NOT NULL,
    CONSTRAINT PK_empresa PRIMARY KEY (id_empresa)
);

/* ---------------------------------------------------------------------- */
/* Foreign key constraints                                                */
/* ---------------------------------------------------------------------- */
ALTER TABLE public.pessoa ADD CONSTRAINT fk_pessoa_tipo 
    FOREIGN KEY (id_tipo_pessoa) REFERENCES public.tipo_pessoa (id);
ALTER TABLE public.pessoa ADD CONSTRAINT fk_empresa_pessoa 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.parametros ADD CONSTRAINT fk_empresa_parametros 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.tipo_pessoa ADD CONSTRAINT fk_empresa_tipo_pessoa 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.area_comum ADD CONSTRAINT fk_empresa_area_comum 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.liberacao ADD CONSTRAINT fk_liberacao_usuario 
    FOREIGN KEY (id_usuario) REFERENCES public.usuario (id);
ALTER TABLE public.liberacao ADD CONSTRAINT fk_liberacao_porta 
    FOREIGN KEY (id_porta) REFERENCES public.porta (id);
ALTER TABLE public.liberacao ADD CONSTRAINT fk_liberacao_morador 
    FOREIGN KEY (id_morador_autorizacao) REFERENCES public.morador (id);
ALTER TABLE public.liberacao ADD CONSTRAINT fk_liberacao_pre_liberacao 
    FOREIGN KEY (id_pre_liberacao) REFERENCES public.pre_liberacao (id);
ALTER TABLE public.liberacao ADD CONSTRAINT fk_liberacao_unidade 
    FOREIGN KEY (id_unidade_destino) REFERENCES public.unidade (id);
ALTER TABLE public.liberacao ADD CONSTRAINT fk_liberacao_area_comum 
    FOREIGN KEY (id_area_comum) REFERENCES public.area_comum (id);
ALTER TABLE public.liberacao ADD CONSTRAINT fk_liberacao_pessoa 
    FOREIGN KEY (id_pessoa) REFERENCES public.pessoa (id);
ALTER TABLE public.liberacao ADD CONSTRAINT fk_empresa_liberacao 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.perfil ADD CONSTRAINT fk_empresa_perfil 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.usuario ADD CONSTRAINT fk_usuario_perfil 
    FOREIGN KEY (id_perfil) REFERENCES public.perfil (id);
ALTER TABLE public.usuario ADD CONSTRAINT fk_empresa_usuario 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.veiculo ADD CONSTRAINT fk_veiculo_morador 
    FOREIGN KEY (id_morador) REFERENCES public.morador (id);
ALTER TABLE public.veiculo ADD CONSTRAINT fk_empresa_veiculo 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.morador ADD CONSTRAINT fk_morador_pessoa 
    FOREIGN KEY (id_pessoa) REFERENCES public.pessoa (id);
ALTER TABLE public.morador ADD CONSTRAINT fk_morador_unidade 
    FOREIGN KEY (id_unidade) REFERENCES public.unidade (id);
ALTER TABLE public.morador ADD CONSTRAINT fk_empresa_morador 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.pre_liberacao ADD CONSTRAINT fk_pre_liberacao_morador 
    FOREIGN KEY (id_morador) REFERENCES public.morador (id);
ALTER TABLE public.pre_liberacao ADD CONSTRAINT fk_pre_liberacao_pessoa 
    FOREIGN KEY (id_pessoa) REFERENCES public.pessoa (id);
ALTER TABLE public.pre_liberacao ADD CONSTRAINT fk_empresa_pre_liberacao 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.unidade ADD CONSTRAINT fk_unidade_bloco 
    FOREIGN KEY (id_bloco) REFERENCES public.bloco (id);
ALTER TABLE public.unidade ADD CONSTRAINT fk_unidade_torre 
    FOREIGN KEY (id_torre) REFERENCES public.torre (id);
ALTER TABLE public.unidade ADD CONSTRAINT fk_empresa_unidade 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.porta ADD CONSTRAINT fk_empresa_porta 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.bloco ADD CONSTRAINT fk_empresa_bloco 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
ALTER TABLE public.torre ADD CONSTRAINT fk_empresa_torre 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
