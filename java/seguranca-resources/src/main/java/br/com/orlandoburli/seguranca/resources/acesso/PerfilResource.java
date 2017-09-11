package br.com.orlandoburli.seguranca.resources.acesso;

import java.util.UUID;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import javax.ws.rs.Path;

import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.model.acesso.perfil.Perfil;
import br.com.orlandoburli.seguranca.model.acesso.perfil.PerfilDao;
import br.com.orlandoburli.seguranca.model.acesso.perfil.PerfilService;

@Path("/perfil")
@Stateless
@Transactional
public class PerfilResource extends AbstractCrudResource<UUID, Perfil, PerfilDao, PerfilService> {

}