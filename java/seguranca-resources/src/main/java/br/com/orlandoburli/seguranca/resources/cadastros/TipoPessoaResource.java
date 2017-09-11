package br.com.orlandoburli.seguranca.resources.cadastros;

import java.util.UUID;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import javax.ws.rs.Path;

import br.com.orlandoburli.seguranca.core.services.AbstractCrudResource;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoa;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoaDao;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoaService;

@Path("/tipo-pessoa")
@Stateless
@Transactional
public class TipoPessoaResource extends AbstractCrudResource<UUID, TipoPessoa, TipoPessoaDao, TipoPessoaService> {

}
