import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AppConfigService } from '@service/appconfigservice';
import { Customer } from '@domain/customer';
import { CustomerService } from '@service/customerservice';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
    templateUrl: './guest.component.html',
    providers: [DialogService],
    styleUrls: ['guest.component.scss']
})
export class GuestComponent {
    ref: DynamicDialogRef | undefined;
    visible: boolean = false;
    subscription: Subscription;
    customers!: Customer[];
    guests!: Array<any>;
    searchValue: string | undefined;

    constructor(
        private configService: AppConfigService,
        private titleService: Title,
        private metaService: Meta,
        private customerService: CustomerService,
        public dialogService: DialogService,
        private router: Router
    ) {
        this.titleService.setTitle('UI Kit - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'PrimeNG Angular UI Kit' });

        this.guests = [
            {
                name: 'Bruno Scholze',
                birthDate: '16/01/2003',
                cpf: '10747269955',
                gender: 'homem',
                passport: '',
                email: 'brunoscholze@gmail.com',
                fone: '99992221292',
                fone2: '9933232323',
                cep: '89128212',
                contry: 'Brasil',
                state: 'SC',
                city: 'Joinville',
                neighborhood: 'Costa e Silva',
                streat: 'Joao Ravache',
                number: '465',
                complement: 'teste',
                status: 'active'
            },
            {
                name: 'Ana Souza',
                birthDate: '12/02/1989',
                cpf: '18745678900',
                gender: 'mulher',
                passport: '',
                email: 'anasouza@gmail.com',
                fone: '99123456789',
                fone2: '99234567890',
                cep: '89012345',
                contry: 'Brasil',
                state: 'SP',
                city: 'São Paulo',
                neighborhood: 'Vila Mariana',
                streat: 'Rua Vergueiro',
                number: '123',
                complement: 'Apto 21',
                status: 'Inactive'
            },
            {
                name: 'Carlos Oliveira',
                birthDate: '05/03/1995',
                cpf: '23456789012',
                gender: 'homem',
                passport: '',
                email: 'carlosoliveira@gmail.com',
                fone: '99234567891',
                fone2: '99345678912',
                cep: '89054321',
                contry: 'Brasil',
                state: 'RJ',
                city: 'Rio de Janeiro',
                neighborhood: 'Copacabana',
                streat: 'Av. Atlântica',
                number: '456',
                complement: 'Apto 31',
                status: 'active'
            },
            {
                name: 'Maria Fernandes',
                birthDate: '15/04/1985',
                cpf: '34567890123',
                gender: 'mulher',
                passport: '',
                email: 'mariafernandes@gmail.com',
                fone: '99345678912',
                fone2: '99456789023',
                cep: '89156789',
                contry: 'Brasil',
                state: 'MG',
                city: 'Belo Horizonte',
                neighborhood: 'Savassi',
                streat: 'Rua da Bahia',
                number: '789',
                complement: 'Apto 12',
                status: 'active'
            },
            {
                name: 'José Silva',
                birthDate: '23/05/1978',
                cpf: '45678901234',
                gender: 'homem',
                passport: '',
                email: 'josesilva@gmail.com',
                fone: '99456789023',
                fone2: '99567890134',
                cep: '89023456',
                contry: 'Brasil',
                state: 'RS',
                city: 'Porto Alegre',
                neighborhood: 'Moinhos de Vento',
                streat: 'Av. Goethe',
                number: '101',
                complement: 'Casa',
                status: 'active'
            },
            {
                name: 'Juliana Mendes',
                birthDate: '29/06/1990',
                cpf: '56789012345',
                gender: 'mulher',
                passport: '',
                email: 'julianamendes@gmail.com',
                fone: '99567890134',
                fone2: '99678901245',
                cep: '89167890',
                contry: 'Brasil',
                state: 'PR',
                city: 'Curitiba',
                neighborhood: 'Batel',
                streat: 'Rua Carlos de Carvalho',
                number: '111',
                complement: 'Apto 5',
                status: 'active'
            },
            {
                name: 'Felipe Ramos',
                birthDate: '30/07/1992',
                cpf: '67890123456',
                gender: 'homem',
                passport: '',
                email: 'feliperamos@gmail.com',
                fone: '99678901245',
                fone2: '99789012356',
                cep: '89178901',
                contry: 'Brasil',
                state: 'SC',
                city: 'Florianópolis',
                neighborhood: 'Lagoa da Conceição',
                streat: 'Rua das Rendeiras',
                number: '222',
                complement: 'Casa',
                status: 'active'
            },
            {
                name: 'Larissa Lima',
                birthDate: '12/08/1991',
                cpf: '78901234567',
                gender: 'mulher',
                passport: '',
                email: 'larissalima@gmail.com',
                fone: '99789012356',
                fone2: '99890123467',
                cep: '89189012',
                contry: 'Brasil',
                state: 'SP',
                city: 'Campinas',
                neighborhood: 'Cambuí',
                streat: 'Av. Norte-Sul',
                number: '333',
                complement: 'Apto 12',
                status: 'active'
            },
            {
                name: 'Gabriel Nunes',
                birthDate: '01/09/1988',
                cpf: '89012345678',
                gender: 'homem',
                passport: '',
                email: 'gabrielnunes@gmail.com',
                fone: '99890123467',
                fone2: '99901234578',
                cep: '89190123',
                contry: 'Brasil',
                state: 'BA',
                city: 'Salvador',
                neighborhood: 'Barra',
                streat: 'Av. Oceânica',
                number: '444',
                complement: 'Apto 15',
                status: 'active'
            },
            {
                name: 'Rafaela Carvalho',
                birthDate: '23/10/1993',
                cpf: '90123456789',
                gender: 'mulher',
                passport: '',
                email: 'rafaelacarvalho@gmail.com',
                fone: '99901234578',
                fone2: '99123456789',
                cep: '89201234',
                contry: 'Brasil',
                state: 'PE',
                city: 'Recife',
                neighborhood: 'Boa Viagem',
                streat: 'Av. Conselheiro Aguiar',
                number: '555',
                complement: 'Apto 8',
                status: 'active'
            },
            {
                name: 'Ricardo Santos',
                birthDate: '17/11/1980',
                cpf: '01234567890',
                gender: 'homem',
                passport: '',
                email: 'ricardosantos@gmail.com',
                fone: '99123456789',
                fone2: '99234567890',
                cep: '89212345',
                contry: 'Brasil',
                state: 'CE',
                city: 'Fortaleza',
                neighborhood: 'Meireles',
                streat: 'Av. Beira Mar',
                number: '666',
                complement: 'Apto 3',
                status: 'active'
            },
            {
                name: 'Fernanda Costa',
                birthDate: '19/12/1987',
                cpf: '12345678901',
                gender: 'mulher',
                passport: '',
                email: 'fernandacosta@gmail.com',
                fone: '99234567890',
                fone2: '99345678912',
                cep: '89223456',
                contry: 'Brasil',
                state: 'AM',
                city: 'Manaus',
                neighborhood: 'Adrianópolis',
                streat: 'Rua Recife',
                number: '777',
                complement: 'Casa',
                status: 'active'
            },
            {
                name: 'Daniel Almeida',
                birthDate: '08/01/1994',
                cpf: '23456789012',
                gender: 'homem',
                passport: '',
                email: 'danielalmeida@gmail.com',
                fone: '99345678912',
                fone2: '99456789023',
                cep: '89234567',
                contry: 'Brasil',
                state: 'PA',
                city: 'Belém',
                neighborhood: 'Nazaré',
                streat: 'Av. Nazaré',
                number: '888',
                complement: 'Apto 10',
                status: 'active'
            },
            {
                name: 'Isabela Rocha',
                birthDate: '28/02/1986',
                cpf: '34567890123',
                gender: 'mulher',
                passport: '',
                email: 'isabelarocha@gmail.com',
                fone: '99456789023',
                fone2: '99567890134',
                cep: '89245678',
                contry: 'Brasil',
                state: 'ES',
                city: 'Vitória',
                neighborhood: 'Praia do Canto',
                streat: 'Rua Aleixo Netto',
                number: '999',
                complement: 'Apto 2',
                status: 'active'
            },
            {
                name: 'João Pedro',
                birthDate: '14/03/1990',
                cpf: '45678901234',
                gender: 'homem',
                passport: '',
                email: 'joaopedro@gmail.com',
                fone: '99567890134',
                fone2: '99678901245',
                cep: '89256789',
                contry: 'Brasil',
                state: 'MT',
                city: 'Cuiabá',
                neighborhood: 'Centro Norte',
                streat: 'Av. Getúlio Vargas',
                number: '1001',
                complement: 'Apto 7',
                status: 'active'
            },
            {
                name: 'Patrícia Silva',
                birthDate: '22/04/1992',
                cpf: '56789012345',
                gender: 'mulher',
                passport: '',
                email: 'patriciasilva@gmail.com',
                fone: '99678901245',
                fone2: '99789012356',
                cep: '89267890',
                contry: 'Brasil',
                state: 'GO',
                city: 'Goiânia',
                neighborhood: 'Setor Bueno',
                streat: 'Av. T-63',
                number: '1101',
                complement: 'Apto 15',
                status: 'active'
            },
            {
                name: 'Marcelo Gomes',
                birthDate: '30/05/1983',
                cpf: '67890123456',
                gender: 'homem',
                passport: '',
                email: 'marcelogomes@gmail.com',
                fone: '99789012356',
                fone2: '99890123467',
                cep: '89278901',
                contry: 'Brasil',
                state: 'PB',
                city: 'João Pessoa',
                neighborhood: 'Tambaú',
                streat: 'Av. Almirante Tamandaré',
                number: '1201',
                complement: 'Apto 11',
                status: 'active'
            },
            {
                name: 'Renata Alves',
                birthDate: '11/06/1981',
                cpf: '78901234567',
                gender: 'mulher',
                passport: '',
                email: 'renataalves@gmail.com',
                fone: '99890123467',
                fone2: '99901234578',
                cep: '89289012',
                contry: 'Brasil',
                state: 'AL',
                city: 'Maceió',
                neighborhood: 'Ponta Verde',
                streat: 'Av. Álvaro Otacílio',
                number: '1301',
                complement: 'Apto 2',
                status: 'active'
            },
            {
                name: 'Thiago Ferreira',
                birthDate: '25/07/1989',
                cpf: '89012345678',
                gender: 'homem',
                passport: '',
                email: 'thiagoferreira@gmail.com',
                fone: '99901234578',
                fone2: '99123456789',
                cep: '89301234',
                contry: 'Brasil',
                state: 'SE',
                city: 'Aracaju',
                neighborhood: 'Atalaia',
                streat: 'Av. Santos Dumont',
                number: '1401',
                complement: 'Casa',
                status: 'active'
            },
            {
                name: 'Luana Pires',
                birthDate: '09/08/1984',
                cpf: '90123456789',
                gender: 'mulher',
                passport: '',
                email: 'luanapires@gmail.com',
                fone: '99123456789',
                fone2: '99234567890',
                cep: '89312345',
                contry: 'Brasil',
                state: 'MS',
                city: 'Campo Grande',
                neighborhood: 'Centro',
                streat: 'Rua 14 de Julho',
                number: '1501',
                complement: 'Apto 9',
                status: 'active'
            },
            {
                name: 'Rodrigo Teixeira',
                birthDate: '04/09/1988',
                cpf: '01234567890',
                gender: 'homem',
                passport: '',
                email: 'rodrigoteixeira@gmail.com',
                fone: '99234567890',
                fone2: '99345678912',
                cep: '89323456',
                contry: 'Brasil',
                state: 'RO',
                city: 'Porto Velho',
                neighborhood: 'Embratel',
                streat: 'Av. Carlos Gomes',
                number: '1601',
                complement: 'Casa',
                status: 'active'
            },
            {
                name: 'Carolina Araújo',
                birthDate: '12/10/1991',
                cpf: '12345678901',
                gender: 'mulher',
                passport: '',
                email: 'carolinaaraujo@gmail.com',
                fone: '99345678912',
                fone2: '99456789023',
                cep: '89334567',
                contry: 'Brasil',
                state: 'TO',
                city: 'Palmas',
                neighborhood: 'Plano Diretor Sul',
                streat: 'Av. JK',
                number: '1701',
                complement: 'Apto 1',
                status: 'active'
            },
            {
                name: 'Pedro Martins',
                birthDate: '22/11/1985',
                cpf: '23456789012',
                gender: 'homem',
                passport: '',
                email: 'pedromartins@gmail.com',
                fone: '99456789023',
                fone2: '99567890134',
                cep: '89345678',
                contry: 'Brasil',
                state: 'PI',
                city: 'Teresina',
                neighborhood: 'Jóquei',
                streat: 'Av. Nossa Senhora de Fátima',
                number: '1801',
                complement: 'Apto 14',
                status: 'active'
            },
            {
                name: 'Camila Ribeiro',
                birthDate: '27/12/1982',
                cpf: '34567890123',
                gender: 'mulher',
                passport: '',
                email: 'camilaribeiro@gmail.com',
                fone: '99567890134',
                fone2: '99678901245',
                cep: '89356789',
                contry: 'Brasil',
                state: 'MA',
                city: 'São Luís',
                neighborhood: 'Renascença',
                streat: 'Av. Colares Moreira',
                number: '1901',
                complement: 'Apto 16',
                status: 'active'
            },
            {
                name: 'Lucas Batista',
                birthDate: '07/01/1993',
                cpf: '45678901234',
                gender: 'homem',
                passport: '',
                email: 'lucasbatista@gmail.com',
                fone: '99678901245',
                fone2: '99789012356',
                cep: '89367890',
                contry: 'Brasil',
                state: 'AC',
                city: 'Rio Branco',
                neighborhood: 'Centro',
                streat: 'Av. Getúlio Vargas',
                number: '2001',
                complement: 'Casa',
                status: 'active'
            },
            {
                name: 'Beatriz Oliveira',
                birthDate: '19/02/1989',
                cpf: '56789012345',
                gender: 'mulher',
                passport: '',
                email: 'beatrizoliveira@gmail.com',
                fone: '99789012356',
                fone2: '99890123467',
                cep: '89378901',
                contry: 'Brasil',
                state: 'AP',
                city: 'Macapá',
                neighborhood: 'Trem',
                streat: 'Av. FAB',
                number: '2101',
                complement: 'Apto 3',
                status: 'active'
            },
            {
                name: 'Matheus Correia',
                birthDate: '30/03/1990',
                cpf: '67890123456',
                gender: 'homem',
                passport: '',
                email: 'matheuscorreia@gmail.com',
                fone: '99890123467',
                fone2: '99901234578',
                cep: '89389012',
                contry: 'Brasil',
                state: 'RR',
                city: 'Boa Vista',
                neighborhood: 'Centro',
                streat: 'Av. Ene Garcez',
                number: '2201',
                complement: 'Apto 11',
                status: 'active'
            },
            {
                name: 'Vanessa Pereira',
                birthDate: '14/04/1992',
                cpf: '78901234567',
                gender: 'mulher',
                passport: '',
                email: 'vanessapereira@gmail.com',
                fone: '99901234578',
                fone2: '99123456789',
                cep: '89390123',
                contry: 'Brasil',
                state: 'AM',
                city: 'Manaus',
                neighborhood: 'Aleixo',
                streat: 'Rua Salvador',
                number: '2301',
                complement: 'Apto 18',
                status: 'active'
            },
            {
                name: 'Eduardo Lima',
                birthDate: '25/05/1987',
                cpf: '89012345678',
                gender: 'homem',
                passport: '',
                email: 'eduardolima@gmail.com',
                fone: '99123456789',
                fone2: '99234567890',
                cep: '89401234',
                contry: 'Brasil',
                state: 'AM',
                city: 'Manaus',
                neighborhood: 'Cidade Nova',
                streat: 'Av. Max Teixeira',
                number: '2401',
                complement: 'Apto 17',
                status: 'active'
            }
        ];
    }

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
    }

    clear(table: Table) {
        table.clear();
        this.searchValue = '';
    }

    getSeverity(status: string) {
        switch (status.toLowerCase()) {
            case 'active':
                return 'info';

            case 'inactive':
                return 'danger';
        }
    }

    getStatuslabel(status: string){
        switch (status.toLowerCase()) {
            case 'active':
                return 'Ativo';

            case 'inactive':
                return 'Inativo';
        }
    }

    get isDarkMode(): boolean {
        return this.configService.config().darkMode;
    }

    public navigateToGuestEdit() {
        this.router.navigate(['/guestEdit']);
    }
}
