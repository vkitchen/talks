use Inline::Perl5;
use Text::Xslate:from<Perl5> <mark_raw>;

my $tx = Text::Xslate.new();

my %vars = (
    title => 'A list of books',
    books => [
        { title => 'Islands in the stream' },
        { title => 'Programming Perl'      },
        # ...
    ],

    # mark HTML components as raw not to escape its HTML tags
    gadget => mark_raw('<div class="gadget">...</div>'),
);

# for strings (easy but slow)
my $template = q{
    <h1><: $title :></h1>
    <ul>
    : for $books -> $book {
        <li><: $book.title :></li>
    : } # for
    </ul>
};

say $tx.render_string($template, %vars);
