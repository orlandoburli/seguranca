package br.com.orlandoburli.seguranca.resources.cadastros;

import java.util.UUID;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import javax.ws.rs.Path;

import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.model.cadastros.torre.Torre;
import br.com.orlandoburli.seguranca.model.cadastros.torre.TorreDao;
import br.com.orlandoburli.seguranca.model.cadastros.torre.TorreService;

@Path("/torre")
@Stateless
@Transactional
public class TorreResource extends AbstractCrudResource<UUID, Torre, TorreDao, TorreService> {

}