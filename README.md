# MCT1
This is the MCT1 plugin for Magikcraft.
MCT1 is a minecraft mod -made using Magikcraft- to simulate Type 1 Diabetes to educate children with Type 1 Diabetes
about their Type 1 Diabetes.

# How to run MCT1


## Supported Platforms

MCT1 runs with the PC / Mac version of Minecraft, also known as the Java version. It does not yet work with XBox, PS4, iPad, or the Windows Store versions of Minecraft.

## Get the Pre-requisites

* To use MCT1 you need a Minecraft account from Mojang. You can get this from [www.minecraft.net](www.minecraft.net). If you live in Australia you may not be able to use your credit card to pay for an account. You can use PayPal or else buy a gift card from Coles or 7/11.

* You can use Mojang's Minecraft client, or you can use the Magikcraft client. If you use the Mojang client you need to enter the MCT1 server details, and also create a profile with the correct version. The Magikcraft client comes preconfigured with the servers for MCT1 and is automatically set to the correct version. Download the Magikcraft client from [client.magikcraft.io](http://client.magikcraft.io).

* You need a GitHub account. Open a GitHub account for free at [www.github.com](http://www.github.com). Make sure that you verify your email by clicking on the link that GitHub sends to you.

## Set up MCT1

* Use your GitHub account to login to the Magikcraft Spellbook at [play.magikcraft.io](https://play.magikcraft.io). This is where you will set up the code for MCT1.

### Enable MCT1

* Put your mouse over your user profile picture and click on "Manage Plugins" in the menu that pops up. You will get a screen that says "`Enabled plugin: package.json`".

* In the `dependencies` section add the mct1 package. That section should look like this:

```
"dependencies": {
      "mct1": "https://github.com/mc-t1/mct1.git"
},
```

* Click "Save Spell". This loads MCT1 for you.

### Create a spell to start MCT1

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

You can use one of the following servers to run MCT1:

play.magikcraft.io
au.open.magikcraft.io

If you have the Magikcraft client, just click on the "Play Magikcraft" button.

If you are using the Mojang client, then click on Add Server, and enter one of the above server addresses into the name and server address fields.

Connect to the server. When you appear in the Minecraft world, type `/spellbook`. You get a link in your console. Press 'T' to activate chat, then click on the link. Open the link in your web browser. This will connect your spellbook with your Minecraft account and allow you to run MCT1.

### Start MCT1

OK, now you're ready to run MCT1!

Press the 'T' key on your keyboard, then type in:

`/cast mct1 start`

This will start MCT1.

# How to develop MCT1

To develop MCT1, fork the [MCT1 repository](https://github.com/mc-t1/mct1). 

Branch from develop.

To run your own version of the code, change your `package.json` in the "Manage Plugins" section of your spellbook to point to your repository. Use a URL hash to specify the branch you want to use. For example:

```
"dependencies": {
      "mct1": "https://github.com/Purpsta/mct1.git#develop"
},
```


