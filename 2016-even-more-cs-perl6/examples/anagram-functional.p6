sub anagramsFor ($word, @possible) {
    grep { .comb.sort.join eq $word.comb.sort.join }, @possible
}

say anagramsFor "allergy", ["gallery", "ballerina", "regally"
                            , "clergy", "largely", "leading"];
