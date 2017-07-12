# **MC-T1**

**MC-T1** is a plugin, made using **Magikcraft**, for **Minecraft** that simulates _Type 1 Diabetes_ to educate children about their or their friend's **Diabetes**.

## What is _Type 1 Diabetes_?

_Type 1 Diabetes_ occurs when the body’s immune system attacks its own pancreas and is irreversible. This attack is known as autoimmune disease. Because of the pancreas being attacked **Insulin** production is halted. **Insulin** is the hormone that serves as a key to open your cells to allow the glucose to enter and allow the use of glucose for energy. Without **Insulin** the glucose stays and builds up in the blood and this starves the cells.

_Type 1 diabetes_ is distinct from _Type 2 Diabetes_. Unlike _Type 2 Diabetes_, _Type 1 Diabetes_ is not a life style disease and is irreversible.

# How to run **MC-T1**

## Supported **Minecraft** versions

MC-T1 is a _server-side mod_. It uses a modified version of the Spigot Minecraft Server. At the moment, the only clients that can connect to this server are the Mac and PC Java client.

**MC-T1** can run with:

* PC version
* Mac version

**MC-T1** does not run with:

* Xbox version
* PS4 version
* IOS version
* Android version
* Windows 10 version, you get off the windows store

## Getting help - the #mct1 channel on Slack

You can find MC-T1 developers in the #mct1 channel of the School of Magik Slack. Slack is an online messenging platform. Go to [slack.magikcraft.io](https://slack.magikcraft.io) to join the School of Magikcraft slack team.

## Before you start

 Before you start using **MC-T1** you will need a few things set up:

* You need a **Minecraft** account from Microsoft. You can get this from [www.minecraft.net](www.minecraft.net). If you have an Australian credit card you might not be able to pay for an account. You can use PayPal or buy a gift card from your local supermarket or 7/11.

* You need a **Minecraft** client. You can use either the Minecraft.net client and our own Magikcraft.io client. If you use the Minecraft.net client you need to create a profile with the correct version of **Minecraft** and enter the MC-T1 server details. The Magikcraft client comes preconfigured with the servers for MC-T1 and is automatically set to the correct version. You can download the Magikcraft client from [client.magikcraft.io](http://client.magikcraft.io).

* You need a GitHub account. Open a GitHub account for free at [www.github.com](http://www.github.com) and make sure that you verify your email by clicking on the link that GitHub sends to you.

## Set up MC-T1

* Use your GitHub account to login to the Magikcraft Spellbook at [play.magikcraft.io](https://play.magikcraft.io). This is where you will set up the code for MC-T1.

### Enable MC-T1

* Put your mouse over your user profile picture and click on "Manage Plugins" in the menu that pops up. You will get a screen that says "`Enabled plugin: package.json`".

* In the `dependencies` section add the mct1 package. That section should look like this:

```
"dependencies": {
      "mct1": "https://github.com/mc-t1/mct1.git"
},
```

* Click "Save Spell". This loads MC-T1 for you.

### Create a spell to start MC-T1

* Click on "Spells" on the top menu.

* Click on "New Spell".

* Paste the following code into the spell, replacing the existing text:

```
const MCT1 = require('mct1').controller;

function mct1(command) {
    MCT1(command);
}
```

### Connect to a Magikcraft server

You can use one of the following servers to run MC-T1:

* au.open.magikcraft.io

If you have the Magikcraft client, click on "Connect to other servers". If you do not see an entry for "Australia", then follow the instructions below for the Minecraft.net client.

If you are using the Minecraft.net client, then click on Add Server, and enter one of the above server addresses into the name and server address fields.

Connect to the server. When you appear in the Minecraft world, type `/spellbook`. You get a link in your console. Press 'T' to activate chat, then click on the link. Open the link in your web browser. This will connect your spellbook with your Minecraft account and allow you to run MC-T1.

### Start MC-T1

OK, now you're ready to run MC-T1!

Press the 'T' key on your keyboard, then type in:

`/cast mct1 start`

This will start MC-T1.

# How to develop MC-T1

To develop MC-T1, fork the [MC-T1 repository](https://github.com/mc-t1/mct1).

Branch from develop.

To run your own version of the code, change your `package.json` in the "Manage Plugins" section of your spellbook to point to your repository. Use a URL hash to specify the branch you want to use. For example:

```
"dependencies": {
      "mct1": "https://github.com/Purpsta/mct1.git#develop"
},
```


