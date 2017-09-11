package br.com.orlandoburli.seguranca.resources.tabelasbasicas;

import java.util.UUID;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import javax.ws.rs.Path;

import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.areacomum.AreaComum;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.areacomum.AreaComumDao;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.areacomum.AreaComumService;

@Path("/areacomum")
@Stateless
@Transactional
public class AreaComumResource extends AbstractCrudResource<UUID, AreaComum, AreaComumDao, AreaComumService> {

}
