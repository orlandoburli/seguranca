package br.com.orlandoburli.seguranca.resources.acesso;

import java.util.UUID;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import javax.ws.rs.Path;

import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.model.acesso.usuario.Usuario;
import br.com.orlandoburli.seguranca.model.acesso.usuario.UsuarioDao;
import br.com.orlandoburli.seguranca.model.acesso.usuario.UsuarioService;

@Path("/usuario")
@Stateless
@Transactional
public class UsuarioResource extends AbstractCrudResource<UUID, Usuario, UsuarioDao, UsuarioService> {

}
