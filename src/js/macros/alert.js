export default function(Macro, Dialog) {

  Macro.add('alert', {
    skipargs: false,
    tags: ['then'],
    handler: function () {

      const title = this.args[0] || '';

      const afterCb =
        this.payload[1] &&
        this.payload[1].name ==='then' &&
        this.payload[1].contents !== ''
            ? () => Wikifier.wikifyEval(this.payload[1].contents.trim())
            : null;

      Dialog.setup(title, "alert");
      Dialog.wiki(this.payload[0].contents.trim());
      Dialog.open({}, afterCb);

    }
  });

}