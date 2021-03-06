/* ---------------------------------------------------------------------- */
/* Script generated with: DeZign for Databases v6.1.0                     */
/* Target DBMS:           PostgreSQL 8.3                                  */
/* Project file:          modelagem_2.dez                                 */
/* Project name:                                                          */
/* Author:                                                                */
/* Script type:           Alter database script                           */
/* Created on:            2017-08-23 12:19                                */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Add table "sessao_usuario"                                             */
/* ---------------------------------------------------------------------- */
CREATE TABLE public.sessao_usuario (
    id_sessao UUID  NOT NULL,
    data_criacao TIMESTAMP  NOT NULL,
    ultima_interacao TIMESTAMP  NOT NULL,
    endereco_ip CHARACTER VARYING(200)  NOT NULL,
    hostname CHARACTER VARYING(200)  NOT NULL,
    id_usuario UUID  NOT NULL,
    id_empresa UUID  NOT NULL,
    CONSTRAINT PK_sessao_usuario PRIMARY KEY (id_sessao)
);

/* ---------------------------------------------------------------------- */
/* Add foreign key constraints                                            */
/* ---------------------------------------------------------------------- */
ALTER TABLE public.sessao_usuario ADD CONSTRAINT usuario_sessao_usuario 
    FOREIGN KEY (id_usuario) REFERENCES public.usuario (id);
ALTER TABLE public.sessao_usuario ADD CONSTRAINT empresa_sessao_usuario 
    FOREIGN KEY (id_empresa) REFERENCES public.empresa (id_empresa);
