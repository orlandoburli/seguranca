/* ---------------------------------------------------------------------- */
/* Script generated with: DeZign for Databases v6.1.0                     */
/* Target DBMS:           PostgreSQL 8.3                                  */
/* Project file:          modelagem_2.dez                                 */
/* Project name:                                                          */
/* Author:                                                                */
/* Script type:           Database drop script                            */
/* Created on:            2017-08-15 22:36                                */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Drop foreign key constraints                                           */
/* ---------------------------------------------------------------------- */
ALTER TABLE public.pessoa DROP CONSTRAINT fk_pessoa_tipo;
ALTER TABLE public.pessoa DROP CONSTRAINT fk_empresa_pessoa;
ALTER TABLE public.parametros DROP CONSTRAINT fk_empresa_parametros;
ALTER TABLE public.tipo_pessoa DROP CONSTRAINT fk_empresa_tipo_pessoa;
ALTER TABLE public.area_comum DROP CONSTRAINT fk_empresa_area_comum;
ALTER TABLE public.liberacao DROP CONSTRAINT fk_liberacao_usuario;
ALTER TABLE public.liberacao DROP CONSTRAINT fk_liberacao_porta;
ALTER TABLE public.liberacao DROP CONSTRAINT fk_liberacao_morador;
ALTER TABLE public.liberacao DROP CONSTRAINT fk_liberacao_pre_liberacao;
ALTER TABLE public.liberacao DROP CONSTRAINT fk_liberacao_unidade;
ALTER TABLE public.liberacao DROP CONSTRAINT fk_liberacao_area_comum;
ALTER TABLE public.liberacao DROP CONSTRAINT fk_liberacao_pessoa;
ALTER TABLE public.liberacao DROP CONSTRAINT fk_empresa_liberacao;
ALTER TABLE public.perfil DROP CONSTRAINT fk_empresa_perfil;
ALTER TABLE public.usuario DROP CONSTRAINT fk_usuario_perfil;
ALTER TABLE public.usuario DROP CONSTRAINT fk_empresa_usuario;
ALTER TABLE public.veiculo DROP CONSTRAINT fk_veiculo_morador;
ALTER TABLE public.veiculo DROP CONSTRAINT fk_empresa_veiculo;
ALTER TABLE public.morador DROP CONSTRAINT fk_morador_pessoa;
ALTER TABLE public.morador DROP CONSTRAINT fk_morador_unidade;
ALTER TABLE public.morador DROP CONSTRAINT fk_empresa_morador;
ALTER TABLE public.pre_liberacao DROP CONSTRAINT fk_pre_liberacao_morador;
ALTER TABLE public.pre_liberacao DROP CONSTRAINT fk_pre_liberacao_pessoa;
ALTER TABLE public.pre_liberacao DROP CONSTRAINT fk_empresa_pre_liberacao;
ALTER TABLE public.unidade DROP CONSTRAINT fk_unidade_bloco;
ALTER TABLE public.unidade DROP CONSTRAINT fk_unidade_torre;
ALTER TABLE public.unidade DROP CONSTRAINT fk_empresa_unidade;
ALTER TABLE public.porta DROP CONSTRAINT fk_empresa_porta;
ALTER TABLE public.bloco DROP CONSTRAINT fk_empresa_bloco;
ALTER TABLE public.torre DROP CONSTRAINT fk_empresa_torre;

/* ---------------------------------------------------------------------- */
/* Drop table "veiculo"                                                   */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.veiculo DROP CONSTRAINT pk_veiculo;

/* Drop table */
DROP TABLE public.veiculo;

/* ---------------------------------------------------------------------- */
/* Drop table "liberacao"                                                 */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.liberacao DROP CONSTRAINT pk_liberacao;

/* Drop table */
DROP TABLE public.liberacao;

/* ---------------------------------------------------------------------- */
/* Drop table "pre_liberacao"                                             */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.pre_liberacao DROP CONSTRAINT pk_pre_liberacao;

/* Drop table */
DROP TABLE public.pre_liberacao;

/* ---------------------------------------------------------------------- */
/* Drop table "morador"                                                   */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.morador DROP CONSTRAINT pk_morador;

/* Drop table */
DROP TABLE public.morador;

/* ---------------------------------------------------------------------- */
/* Drop table "unidade"                                                   */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.unidade DROP CONSTRAINT pk_unidade;

/* Drop table */
DROP TABLE public.unidade;

/* ---------------------------------------------------------------------- */
/* Drop table "pessoa"                                                    */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.pessoa DROP CONSTRAINT pk_pessoa;

/* Drop table */
DROP TABLE public.pessoa;

/* ---------------------------------------------------------------------- */
/* Drop table "torre"                                                     */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.torre DROP CONSTRAINT pk_torr;

/* Drop table */
DROP TABLE public.torre;

/* ---------------------------------------------------------------------- */
/* Drop table "bloco"                                                     */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.bloco DROP CONSTRAINT pk_bloco;

/* Drop table */
DROP TABLE public.bloco;

/* ---------------------------------------------------------------------- */
/* Drop table "porta"                                                     */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.porta DROP CONSTRAINT pk_porta;

/* Drop table */
DROP TABLE public.porta;

/* ---------------------------------------------------------------------- */
/* Drop table "usuario"                                                   */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.usuario DROP CONSTRAINT pk_usuario;

/* Drop table */
DROP TABLE public.usuario;

/* ---------------------------------------------------------------------- */
/* Drop table "perfil"                                                    */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.perfil DROP CONSTRAINT pk_perfil;

/* Drop table */
DROP TABLE public.perfil;

/* ---------------------------------------------------------------------- */
/* Drop table "area_comum"                                                */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.area_comum DROP CONSTRAINT pk_area_comum;

/* Drop table */
DROP TABLE public.area_comum;

/* ---------------------------------------------------------------------- */
/* Drop table "tipo_pessoa"                                               */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.tipo_pessoa DROP CONSTRAINT pk_tipo_pessoa;

/* Drop table */
DROP TABLE public.tipo_pessoa;

/* ---------------------------------------------------------------------- */
/* Drop table "parametros"                                                */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.parametros DROP CONSTRAINT pk_parametros;

/* Drop table */
DROP TABLE public.parametros;

/* ---------------------------------------------------------------------- */
/* Drop table "empresa"                                                   */
/* ---------------------------------------------------------------------- */

/* Drop constraints */
ALTER TABLE public.empresa DROP CONSTRAINT PK_empresa;

/* Drop table */
DROP TABLE public.empresa;
