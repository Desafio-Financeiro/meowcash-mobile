import { expect, $ } from "@wdio/globals";


describe("Login Flow", () => {
  it("should login successfully", async () => {
    const emailField = await $("android=new UiSelector().text(\"E-mail\")");
    await emailField.setValue("p@g.com");

    const passwordField = await $("android=new UiSelector().text(\"Senha\")");
    await passwordField.setValue("123456");

    const loginButton = await $("android=new UiSelector().text(\"Entrar\")");
    await loginButton.click();

    const registerText = await $("android=new UiSelector().textContains(\"Cadastre-se\")");
    await expect(registerText).toBeDisplayed();
  });
});