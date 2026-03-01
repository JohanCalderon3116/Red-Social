export const useGenerarCodigosAleatorios = () => {
  const characters = "0123456789";
  const codeLenght = 8;
  let randomCode = "";
  for (let i = 0; i < codeLenght; i++) {
    randomCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  const codigo = `${randomCode}`;
  return codigo;
};
