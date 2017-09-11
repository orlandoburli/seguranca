package br.com.orlandoburli.seguranca.model.acesso.usuario;

import java.util.Calendar;
import java.util.UUID;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.utils.SegurancaUtils;
import br.com.orlandoburli.seguranca.model.acesso.perfil.PerfilDao;
import br.com.orlandoburli.seguranca.model.acesso.usuario.exceptions.LoginDuplicadoException;
import br.com.orlandoburli.seguranca.model.acesso.usuario.exceptions.LoginInvalidoException;
import br.com.orlandoburli.seguranca.model.acesso.usuario.exceptions.UsuarioDuplicadoException;
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;
import br.com.orlandoburli.seguranca.model.geral.empresa.EmpresaService;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.SessaoUsuario;
import br.com.orlandoburli.seguranca.model.geral.sessaousuario.SessaoUsuarioService;

public class UsuarioService extends AbstractService<UUID, Usuario, UsuarioDao> {

	@Inject
	private PerfilDao perfilDao;

	@Inject
	private HttpServletRequest request;

	@Inject
	private EmpresaService empresaService;

	@Inject
	private SessaoUsuarioService sessaoUsuarioService;

	@Override
	public void doAntesSalvar(Usuario vo) throws BusinessException {

		vo.setPerfil(this.perfilDao.buscar(vo.getPerfil()));

		if ((vo.getAtivo() != null) && vo.getAtivo().equals(Status.ATIVO)) {

			if ((vo.getNome() != null) && !vo.getNome().trim().isEmpty()) {
				Usuario buscarPorNome = this.getDao().buscarPorNome(vo.getNome(), Status.ATIVO, (Empresa) vo.getEmpresa());

				if (buscarPorNome != null) {
					if ((vo.getId() == null) || !buscarPorNome.getId().equals(vo.getId())) {
						throw new UsuarioDuplicadoException(vo);
					}
				}
			}

			if ((vo.getLogin() != null) && !vo.getLogin().trim().isEmpty()) {
				Usuario buscarPorLogin = this.getDao().buscarPorLogin(vo.getLogin(), Status.ATIVO, (Empresa) vo.getEmpresa());

				if (buscarPorLogin != null) {
					if ((vo.getId() == null) || !buscarPorLogin.getId().equals(vo.getId())) {
						throw new LoginDuplicadoException(vo);
					}
				}
			}
		}

		super.doAntesSalvar(vo);
	}

	public SessaoUsuario entrar(String login, String senha, UUID idEmpresa) throws BusinessException {

		if (this.request == null) {
			throw new LoginInvalidoException("Request indisponível no contexto!");
		}

		// Buscar empresa
		Empresa empresa = this.empresaService.buscar(idEmpresa);

		if (empresa == null) {
			throw new LoginInvalidoException("Empresa inválida!");
		}

		Usuario buscarPorLogin = this.getDao().buscarPorLogin(login, Status.ATIVO, empresa);

		if (buscarPorLogin == null) {
			throw new LoginInvalidoException("Usuário / Senha inválidos!");
		}

		if (buscarPorLogin.getLogin().equals(login) && buscarPorLogin.getSenha().equalsIgnoreCase(senha)) {
			if (buscarPorLogin.getAtivo() == Status.ATIVO) {

				String ipAddress = SegurancaUtils.getIpFromRequest(this.request);

				String computerName = SegurancaUtils.getComputerNameFromIP(ipAddress);

				SessaoUsuario su = new SessaoUsuario();

				su.setHostName(computerName);
				su.setEnderecoIp(ipAddress);
				su.setDataCriacao(Calendar.getInstance());
				su.setUltimaInteracao(Calendar.getInstance());
				su.setUsuario(buscarPorLogin);
				su.setEmpresa(empresa);

				su = this.sessaoUsuarioService.inserir(su);

				return su;
			}
		}

		throw new LoginInvalidoException("Usuário / Senha inválidos!");
	}

}
