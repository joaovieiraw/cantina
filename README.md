# Cantina do Tio João (Expo + Context + Navigation + Axios)

## 1) Criar o projeto Expo (se ainda não criou)
```bash
npx create-expo-app CantinaDoTioJoao
cd CantinaDoTioJoao
```

## 2) Instalar dependências (igual padrão de aula)
```bash
npm i @react-navigation/native
npm i react-native-screens react-native-safe-area-context
npm i @react-navigation/native-stack
npm i axios
```

> Se aparecer aviso do Expo, reinicie o Metro Bundler depois de instalar.

## 3) Copiar os arquivos deste ZIP para dentro do seu projeto
- Copie `App.js` para a raiz do projeto
- Copie a pasta `src/` para a raiz do projeto

## 4) Configurar o BASE_URL
Edite:
`src/services/api.js`
e troque:
`https://SEU-LINK.trycloudflare.com`
pelo seu link do Cloudflare Tunnel.

## 5) Rodar
```bash
npx expo start
```

## Observação
O login aqui está SIMULADO (Aluno/ADM). Você pode evoluir para login real depois.
