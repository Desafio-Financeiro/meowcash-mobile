# Meow Cash

Meow Cash é uma aplicação de controle financeiro desenvolvida para ajudar usuários a gerenciar suas despesas e receitas
de forma eficiente e intuitiva.

## 🎨 Design System

O design do projeto foi criado no Figma e pode ser acessado através do link abaixo:

[Meow Cash - Design System no Figma](https://www.figma.com/design/ZBEKS9dKjiqHyXigdg8Yj0/Meowcash?node-id=2017-1473&p=f)

## 📂 Repositório do projeto

O código-fonte do projeto está disponível no GitHub:

[Meow Cash - Repositório no GitHub](https://github.com/Desafio-Financeiro/meowcash-mobile)

## 🛠️ Como rodar o projeto localmente

Siga os passos abaixo para configurar e executar o projeto em sua máquina:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Desafio-Financeiro/meowcash-mobile.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd meowcash-mobile
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o projeto:
   ```bash
   npm run start
   ```

## 📂 Como este projeto está organizado (Clean Architecture)

Utilizamos os princípios de Clean Architecture para organizar o projeto, separando a aplicação em _apresentação_, _domínio_ e _infraestrutura_.

```
├── app (camada de apresentação)
│   ├── screens
│   │   ├── (auth)
│   │   │   └── landing-page
│   │   │   └── login
│   │   │   └── register
│   │   │   └── splash-screen
│   │   ├── (protected)
│   │   │   └── extract
│   │   │   └── home
│   │   │   └── reports
│   │   ├── _layout.tsx
│   │   └── routes.tsx
│   └── components
├── context
├── domain (camada de domínio)
│   ├── repositories
│   │   ├── AuthRepository.ts
│   │   ├── BalanceRepository.ts
│   │   └── TransactionsRepository.ts
│   └── usecases
│   │   ├── AuthUseCases.ts
│   │   ├── BalanceUseCases.ts
│   │   └── TransactionsUseCases.ts
├── infrastructure (camada de infraestrutura)
│   ├── api
│   │   ├── AuthApi.ts
│   │   ├── BalanceApi.ts
│   │   └── TransactionApi.ts
│   └── firebase
│   │   └── config.ts
├── utils
```

Na **camada de apresentação** (_app_) temos as telas da aplicação, os componentes UI e suas regras de negócio.

Na **camada de domínio** (_domain_) temos as regras de negócio da aplicação, independentes de frameworks, bibliotecas externas ou outro tipo de integração. Em _repositories_ temos as interfaces dos repositórios que atuam como intermediários entre a camada de domínio da aplicação e a camada de dados (infraestrutura). Em _usecases_  estão os casos de uso, componentes que encapsulam a lógica de negócio específica para uma determinada tarefa que o sistema precisa realizar. Eles abstraem as operações de acesso a dados, implementadas na camada de infraestrutura, permitindo que a lógica de negócio seja independente dos detalhes de implementação da persistência.

Por último, a **camada de infraestrutura** (_infrastructure_) é responsável por lidar com todos os detalhes técnicos e específicos da aplicação, como bancos de dados e APIs externas. É uma forma de isolar as regras de negócio das dependências técnicas. Neste diretório temos a conexão com o Firebase, tanto suas configurações quanto as operações a serem realizadas, as quais serão abstraídas pelos casos de uso na camada de domínio.

como rodar os testes em android
```bash
npx expo prebuild --platform android
npx expo run:android
npx detox build --configuration android.emu.debug
npx detox test --configuration android.emu.debug

```